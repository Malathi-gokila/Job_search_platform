# bert_similarity.py
import sys
import json
from sentence_transformers import SentenceTransformer, util
import numpy as np

# Load a pre-trained Sentence-BERT model
# 'all-MiniLM-L6-v2' is a good balance of speed and performance.
# Other models: 'paraphrase-MiniLM-L6-v2', 'all-mpnet-base-v2' (better but slower)
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_bert_embeddings(texts):
    return model.encode(texts, convert_to_tensor=False) # Get numpy arrays

def calculate_cosine_similarity(embedding1, embedding2_list):
    similarities = []
    for emb2 in embedding2_list:
        # util.cos_sim returns a tensor, convert to float
        # Or use sklearn.metrics.pairwise.cosine_similarity
        score = util.pytorch_cos_sim(embedding1, emb2)
        similarities.append(score.item())
    return similarities

if __name__ == "__main__":
    # Read input from stdin (JSON string)
    input_data_str = sys.stdin.read()
    input_data = json.loads(input_data_str)

    job_description_text = input_data['jobDescription']
    # resumes is a dictionary: { "resumeId1": "text1", "resumeId2": "text2", ... }
    resume_data = input_data['resumes'] 

    if not job_description_text or not resume_data:
        print(json.dumps({"error": "Job description and resumes are required."}), file=sys.stderr)
        sys.exit(1)

    resume_ids = list(resume_data.keys())
    resume_texts = list(resume_data.values())

    try:
        # Generate embeddings
        job_desc_embedding = get_bert_embeddings([job_description_text])[0] # Get the single embedding
        resume_embeddings = get_bert_embeddings(resume_texts)

        # Calculate similarities
        similarities = calculate_cosine_similarity(job_desc_embedding, resume_embeddings)

        ranked_resumes = []
        for i, resume_id in enumerate(resume_ids):
            ranked_resumes.append({
                "resumeId": resume_id,
                "similarity": similarities[i]
            })
        
        # Output results as JSON to stdout
        print(json.dumps({"rankedResumes": ranked_resumes}))

    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)