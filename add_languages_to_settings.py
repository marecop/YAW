import os

def update_settings_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    if "const languages = [" not in content:
        return

    # Check if jp is already there
    if "{ code: 'jp'" in content:
        print(f"Skipping {filepath}, already has jp")
        return

    # Find the languages array and append new languages
    target_string = "{ code: 'de', name: '德語', nativeName: 'Deutsch' },"
    replacement_string = "{ code: 'de', name: '德語', nativeName: 'Deutsch' },\n    { code: 'jp', name: '日語', nativeName: '日本語' },\n    { code: 'es', name: '西班牙語', nativeName: 'Español' },"
    
    new_content = content.replace(target_string, replacement_string)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find target string in {filepath}")

# Walk through app directory
for root, dirs, files in os.walk("app"):
    if "settings" in root and "page.tsx" in files:
        filepath = os.path.join(root, "page.tsx")
        update_settings_file(filepath)
