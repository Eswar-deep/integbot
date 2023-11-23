from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# Create a new openai api key
os.environ["OPENAI_API_KEY"] = "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"

# set up openai api key
openai_api_key = os.environ.get('OPENAI_API_KEY')

def create_retriever():
    directory = 'C:/Users/91767/Documents/bits/tech learning/Web/projects/Integbot-main/test_data'

    docs = DirectoryLoader(directory).load ( )
    print(len(docs))


    text_splitter = RecursiveCharacterTextSplitter (chunk_size=1000, chunk_overlap=100)
    texts = text_splitter.split_documents(docs)


    # Embed and store the texts
    # Supplying a persist_directory will store the embeddings on disk
    persist_directory = 'chroma_db21'

    # OpenAI embeddings
    embedding = OpenAIEmbeddings()

    vectordb = Chroma.from_documents(documents=texts,
                                    embedding=embedding, persist_directory=persist_directory)

    # Persist the db to disk
    vectordb.persist()
    vectordb = None
    print("data fed success")
    # # Now we can load the persisted database from disk, and use it as normal.
    # vectordb = Chroma(persist_directory=persist_directory,
    #                 embedding_function=embedding)

    # # retriever = vectordb.as_retriever()

    # retriever = vectordb.as_retriever(search_kwargs={"k": 1})
    # return retriever

if __name__ == "__main__":
    create_retriever()