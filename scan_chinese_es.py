import os
import re

def contains_chinese(text):
    return re.search(r'[\u4e00-\u9fa5]', text)

def scan_directory(directory):
    files_with_chinese = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if contains_chinese(content):
                            files_with_chinese.append(filepath)
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")
    return files_with_chinese

if __name__ == "__main__":
    target_dir = "app/es"
    files = scan_directory(target_dir)
    print("Files containing Chinese characters in app/es:")
    for file in files:
        print(file)
