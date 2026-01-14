import os
import re

def has_chinese(text):
    return bool(re.search(r'[\u4e00-\u9fff]', text))

def scan_files():
    files_with_chinese = []
    root_dir = 'app/en'
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Exclude console.log lines from check if possible, but simpler to just check whole file first
                        if has_chinese(content):
                            files_with_chinese.append(file_path)
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
    
    return files_with_chinese

if __name__ == '__main__':
    files = scan_files()
    for f in files:
        print(f)
