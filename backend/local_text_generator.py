# local_text_generator.py
from flask import Flask, request, jsonify
from transformers import pipeline
import logging # For better logging

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Load a smaller model suitable for your hardware.
# 'text-generation' pipeline is a good start.
# You might need to download the model first if it's not cached.
MODEL_NAME = 'distilgpt2' # Or your chosen model
generator = None

try:
    logger.info(f"Loading model: {MODEL_NAME}...")
    # Explicitly set truncation if you are using max_length for generation
    # and want to ensure input is handled correctly.
    # For simple text generation from a prompt, truncation might not be strictly needed
    # unless your prompts are extremely long and exceed model's max input length.
    # Let's keep it simple for now and address truncation if it becomes an issue with specific prompts.
    generator = pipeline('text-generation', model=MODEL_NAME)
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading model: {e}", exc_info=True)
    # generator will remain None

@app.route('/generate', methods=['POST'])
def generate():
    if not generator:
        logger.error("Model not loaded, cannot generate.")
        return jsonify({"error": "Model not loaded properly. Check server logs."}), 503 # Service Unavailable

    data = request.get_json()
    if not data:
        logger.warning("Received empty request body.")
        return jsonify({"error": "Request body is missing or not JSON."}), 400

    prompt_text = data.get('prompt')
    if not prompt_text or not isinstance(prompt_text, str):
        logger.warning(f"Received invalid or missing prompt: {prompt_text}")
        return jsonify({"error": "Prompt is required and must be a string."}), 400

    logger.info(f"Received prompt: '{prompt_text[:100]}...'") # Log a snippet of the prompt

    try:
        # Adjust max_length and other parameters as needed
        # Add truncation=True if you are passing very long prompts and want to truncate them
        # For job description prompts, this is usually not an issue.
        outputs = generator(
            prompt_text,
            max_length=350,       # Increased max_length a bit
            num_return_sequences=1,
            pad_token_id=generator.tokenizer.eos_token_id # Explicitly set to suppress warning
        )
        
        generated_text_candidate = outputs[0]['generated_text']
        
        # Clean the prompt from the beginning of the generated text if the model includes it
        # This is common for some models when given a direct prompt.
        if generated_text_candidate.startswith(prompt_text):
             generated_text = generated_text_candidate[len(prompt_text):].strip()
        else:
            generated_text = generated_text_candidate.strip()
        
        # Ensure generated_text is a string, even if empty
        if not isinstance(generated_text, str):
            generated_text = "" # Default to empty string if something unexpected happens

        logger.info(f"Generated text snippet: '{generated_text[:100]}...'")
        return jsonify({"text": generated_text}) # Always return a "text" field
    except Exception as e:
        logger.error(f"Error during generation for prompt '{prompt_text[:50]}...': {e}", exc_info=True)
        return jsonify({"error": f"Error during text generation: {str(e)}"}), 500

if __name__ == '__main__':
    # Consider using a more production-ready WSGI server like gunicorn for Flask in production
    app.run(host='0.0.0.0', port=5001, debug=False) # Turn off Flask debug mode for cleaner logs unless actively debugging Flask