#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Step 8: Generate JSON from NotebookLM Output
"""

import os
import sys
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("XAI_API_KEY"),
    base_url="https://api.x.ai/v1",
)

def load_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

def generate_json(notebooklm_output, search_intent):
    
    prompt = """I have research from NotebookLM. Convert it to JSON with this EXACT structure:

{
  "searchIntent": "SEARCH_INTENT_HERE",
  "productCategory": "CATEGORY_HERE",
  "lastUpdated": "2025-01-24",
  "verdict": {
    "winnerExists": true,
    "summary": "180 chars max summary",
    "verifiedDate": "2025-01-24"
  },
  "bestsellerWarning": "200 chars max warning about failures",
  "winner": {
    "name": "50 chars max SHORT name",
    "fullName": "Full product name",
    "asin": "ASIN",
    "amazonUrl": "Full URL",
    "imageUrl": "Real Amazon image URL",
    "salesRank": "#5 in Category",
    "reviewCount": "10K+ bought",
    "rating": 4.5,
    "whyItWins": "120 chars max why it wins",
    "specs": {
      "whatYouGet": [
        {"label": "Capacity", "value": "26 QT"},
        {"label": "Material", "value": "Stainless steel"}
      ],
      "certifications": ["FDA approved", "ETL certified"]
    },
    "materialEvidence": [
      {"title": "Title", "description": "Description"}
    ],
    "customerReview": {
      "quote": "Actual quote",
      "author": "Name",
      "date": "January 2025",
      "verified": true
    },
    "keyEvidence": [
      {
        "claim": "Claim",
        "evidence": "Evidence [Source: Amazon]",
        "importance": "critical"
      }
    ],
    "customerValidation": {
      "quote": "Quote",
      "reviewer": "Name",
      "context": "Context"
    }
  },
  "failureCards": [
    {
      "name": "50 chars max",
      "imageUrl": "Real Amazon URL",
      "badge": "Prop 65: Lead",
      "amazonUrl": "URL",
      "description": "180 chars max why it fails"
    }
  ],
  "failures": [
    {
      "rank": 1,
      "name": "Full name",
      "asin": "ASIN",
      "amazonUrl": "URL",
      "salesRank": "#1 bestseller",
      "claimMade": "Claim",
      "actualReality": "Reality",
      "whyItFails": "Explanation",
      "evidence": [
        {
          "claim": "Claim",
          "quote": "Quote",
          "source": "Source",
          "severity": "critical"
        }
      ],
      "marketingVsReality": {
        "marketed": "Marketed",
        "reality": "Reality"
      }
    }
  ],
  "methodology": {
    "dataSource": "50+ listings",
    "steps": [
      {"num": 1, "title": "Title", "text": "250 chars max"},
      {"num": 2, "title": "Title", "text": "250 chars max"},
      {"num": 3, "title": "Title", "text": "250 chars max"},
      {"num": 4, "title": "Title", "text": "250 chars max"}
    ],
    "disqualifiers": ["Item 1"],
    "qualifiers": ["Item 1"]
  },
  "searchMetadata": {
    "totalProductsAnalyzed": 50,
    "analysisDate": "2025-01-24"
  }
}

NOTEBOOKLM RESEARCH:
""" + notebooklm_output + """

REQUIREMENTS:
- Use search intent: """ + search_intent + """
- Use Emeril Lagasse as winner (highest ranked, safest)
- Use 3 failures: Ninja, COSORI, Instant Pot
- Use EXACTLY 4 methodology steps
- Use EXACTLY 3 failureCards
- Extract real Amazon image URLs
- Use today: 2025-01-24
- Enforce ALL character limits
- Output ONLY valid JSON, no markdown
"""
    
    print("Sending to Grok AI...")
    
    completion = client.chat.completions.create(
        model="grok-3",
        messages=[
            {"role": "system", "content": "You output ONLY valid JSON. No markdown, no explanations. Follow the structure exactly."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.1,
    )
    
    response = completion.choices[0].message.content
    
    if response.startswith('```'):
        lines = response.split('\n')
        response = '\n'.join(lines[1:-1])
        if response.startswith('json'):
            response = response[4:].strip()
    
    return response

def validate_json(json_str):
    try:
        data = json.loads(json_str)
        
        required = ['searchIntent', 'verdict', 'winner', 'failureCards', 'methodology']
        missing = [f for f in required if f not in data]
        
        if missing:
            print("Warning: Missing fields: " + ', '.join(missing))
            return False
        
        if len(data['winner']['name']) > 50:
            print("Warning: winner.name too long: " + str(len(data['winner']['name'])))
        
        if len(data['winner']['whyItWins']) > 120:
            print("Warning: winner.whyItWins too long: " + str(len(data['winner']['whyItWins'])))
        
        if len(data['verdict']['summary']) > 180:
            print("Warning: verdict.summary too long: " + str(len(data['verdict']['summary'])))
        
        if len(data['failureCards']) != 3:
            print("Warning: failureCards has " + str(len(data['failureCards'])) + " items (need 3)")
        
        if len(data['methodology']['steps']) != 4:
            print("Warning: methodology.steps has " + str(len(data['methodology']['steps'])) + " items (need 4)")
        
        print("JSON structure is valid!")
        return True
        
    except json.JSONDecodeError as e:
        print("Error: Invalid JSON: " + str(e))
        return False

def save_json(json_str, output_path):
    data = json.loads(json_str)
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)
    print("JSON saved to: " + output_path)

def main():
    if len(sys.argv) != 4:
        print("Usage: python3 step8_generate_json.py <notebooklm_file> <search_intent> <output_file>")
        print("")
        print("Example:")
        print("  python3 step8_generate_json.py notebooklm.txt 'Non-Toxic Air Fryer' output.json")
        sys.exit(1)
    
    notebooklm_file = sys.argv[1]
    search_intent = sys.argv[2]
    output_file = sys.argv[3]
    
    if not os.environ.get("XAI_API_KEY"):
        print("Error: XAI_API_KEY not set")
        sys.exit(1)
    
    print("Loading: " + notebooklm_file)
    try:
        research = load_file(notebooklm_file)
    except FileNotFoundError:
        print("Error: File not found")
        sys.exit(1)
    
    print("Search Intent: " + search_intent)
    
    json_output = generate_json(research, search_intent)
    
    print("")
    print("Validating...")
    is_valid = validate_json(json_output)
    
    print("")
    print("Saving...")
    save_json(json_output, output_file)
    
    print("")
    if is_valid:
        print("SUCCESS! Step 8 complete!")
        print("")
        print("Next: Test the JSON")
        print("  cat " + output_file)
    else:
        print("WARNING: JSON has issues but saved anyway")
        print("Review and fix manually if needed")

if __name__ == "__main__":
    main()
