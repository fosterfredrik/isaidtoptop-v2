#!/usr/bin/env python3
"""Add Amazon affiliate tag to all product URLs"""

import json
from pathlib import Path

TAG = "isaidtoptop-20"

app_dir = Path("app")
updated = 0

for category_dir in app_dir.iterdir():
    products_dir = category_dir / "products"
    if not products_dir.exists():
        continue
    
    for json_file in products_dir.glob("*.json"):
        with open(json_file, 'r') as f:
            data = json.load(f)
        
        modified = False
        
        # Check winner amazonUrl
        if 'winner' in data and 'amazonUrl' in data['winner']:
            url = data['winner']['amazonUrl']
            if 'amazon.com' in url and f'tag={TAG}' not in url:
                data['winner']['amazonUrl'] = url.rstrip('/') + f"?tag={TAG}"
                modified = True
        
        # Check runnerUps amazonUrl
        for runner in data.get('runnerUps', []):
            if 'amazonUrl' in runner:
                url = runner['amazonUrl']
                if 'amazon.com' in url and f'tag={TAG}' not in url:
                    runner['amazonUrl'] = url.rstrip('/') + f"?tag={TAG}"
                    modified = True
        
        if modified:
            with open(json_file, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"✅ {json_file}")
            updated += 1

print(f"\n🎉 Updated {updated} files with tag: {TAG}")
