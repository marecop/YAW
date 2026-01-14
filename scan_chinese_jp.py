import os
import re

def contains_chinese(text):
    # Match Chinese characters, including potential punctuation
    return re.search(r'[\u4e00-\u9fff]', text) is not None

def scan_directory(directory):
    files_with_chinese = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    lines = content.split('\n')
                    has_chinese = False
                    for line in lines:
                        # Skip simple console.log lines to reduce noise, though we need to check inside them if user wanted strict exclusion
                        # The user said "except console.log", so we just want to find files that have Chinese *outside* of console.log/comments theoretically?
                        # But for scanning, finding any Chinese is a good start. 
                        if contains_chinese(line):
                            has_chinese = True
                            break
                    
                    if has_chinese:
                        files_with_chinese.append(filepath)
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")
                    
    return files_with_chinese

if __name__ == "__main__":
    target_dir = "app/jp"
    if os.path.exists(target_dir):
        files = scan_directory(target_dir)
        print(f"Found {len(files)} files with Chinese characters:")
        for f in files:
            print(f)
    else:
        print(f"Directory {target_dir} does not exist.")
