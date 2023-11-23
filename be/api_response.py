from flask import Flask, request, jsonify
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
import os
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
import flask_cors
from flask_cors import CORS
chat_history = []
app = Flask(__name__)
CORS(app)

flask_cors.cross_origin(
    origins = '*'
)

def start(query):
    os.environ["OPENAI_API_KEY"] = "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"
    # set up openai api key
    openai_api_key = os.environ.get('OPENAI_API_KEY')
    # Now we can load the persisted database from disk, and use it as normal.
    vectordb = Chroma(persist_directory='chroma_db21',
                    embedding_function=OpenAIEmbeddings())

    # memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    retriever = vectordb.as_retriever(search_kwargs={"k": 7})
    # retriever = vectordb.as_retriever()
    # print(retriever)
    # retriever = feed_data.create_retriever()
    # Create the chain to answer questions
    # qa_chain = RetrievalQA.from_chain_type(llm=OpenAI(),
    #                                 chain_type="stuff",
    #                                 retriever=retriever,
    #                                 return_source_documents=True,
    #                                 verbose=True)
    qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0), 
                                               retriever=retriever)

    # llm_response = qa_chain(query)
    # print(llm_response['result'])
    result = qa({"question": query, 'chat_history': chat_history})
    result = result['answer']
    chat_history.append((query, result))
    # if "sorry" or "I don't know" in result:
    #     result = "Please contact Integbot team members who didn't fed this data context to me for any assistance"
    return {'result': result}

@app.route('/process_query', methods=['GET'])
def process_query():
    query = request.args.get('query')  # Get the 'query' parameter from the URL
    if query:
        formatted_response = start(query=query)
        return jsonify(formatted_response)
    else:
        return jsonify({'error': 'Missing or invalid query parameter'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
