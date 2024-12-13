import os
import csv
import boto3
from pathlib import Path
from openai import AzureOpenAI

ssm = boto3.client("ssm", region_name="ap-south-1")
azure_openai_api_key = ssm.get_parameter(Name="/mathtutor/AZURE_OPENAI_API_KEY", WithDecryption=True)["Parameter"]["Value"]

AZURE_OPENAI_ENDPOINT = 'https://ai-mathtutorhub605901471011.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-08-01-preview'
MODEL_NAME = "gpt-4o-mini"

client = AzureOpenAI(
    api_version="2024-08-01-preview",
    api_key=azure_openai_api_key,
    azure_endpoint=AZURE_OPENAI_ENDPOINT
)

PROMPT = """
You are a react expert and given a react code you apply these changes.

Strictly follow and apply these:
- Fix this react code to work for next js shadcn ui.
- Use “any” data types
- Use “@/components/custom_ui/…” react shadcn ui elements (separate import line for each element `improt { <elem> } from @/components/custom_ui/<elem>`)
- Use { Path } from “@/components/custom_ui/path” if using svg elements
- Define “id” for all the onClick and onChange (user actions) elements (button, input, select, dropdown-menu, path, textarea, toggle-group, toggle)
- Do not add any comment, write full code. 
- Don't refactor the code, keep it as it is, just modify according to above requirements

Only return the code and no explaination.
"""

def sanitize_filename(name):
    """Remove spaces and special characters from filename"""
    return "".join(c for c in name if c.isalnum())

def sanitize_code_with_openai(code):
    print("Sanitizing code with OpenAI...")
    messages = [{"role": "system", "content": PROMPT}]
    messages.append({"role": "user", "content": code})
    
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        temperature=0,
        stream=False,
    )
    sanitized_code = response.choices[0].message.content
    sanitized_code = sanitized_code.rstrip("```").lstrip("```javascript")
    print("Sanitization complete.")
    return sanitized_code

def create_tsx_files(csv_path, output_dir="output"):
    """
    Read CSV file and create .tsx files
    
    Args:
        csv_path (str): Path to the input CSV file
        output_dir (str): Directory where .tsx files will be created
    """
    print(f"Creating TSX files from {csv_path}...")
    # Create output directory if it doesn't exist
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    with open(csv_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            # Get filename from Name column and sanitize it
            if row['Name'].strip() == "":
                continue
            filename = sanitize_filename(row['Name']) + '.tsx'
            filepath = os.path.join(output_dir, filename)
            
            print(f"Processing {filename}...")
            # Sanitize the code content using OpenAI
            sanitized_code = sanitize_code_with_openai(row['Code'])
            
            # Write the sanitized code content to the .tsx file
            with open(filepath, 'w', encoding='utf-8') as tsx_file:
                tsx_file.write(sanitized_code)
            
            print(f"Created {filename}")

if __name__ == "__main__":
    # Example usage
    csv_path = "input.csv"  # Replace with your CSV file path
    print("Starting the TSX file creation process...")
    create_tsx_files(csv_path)
    print("TSX file creation process completed.")