
import os
import re

def fix_import_paths():
    routes_dir = 'c:\\Users\\Pcc\\Downloads\\samrat\\routes'
    print(f"Starting script in directory: {routes_dir}")

    for root, dirs, files in os.walk(routes_dir):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r+', encoding='utf-8') as f:
                        content = f.read()
                        original_content = content

                        # Fix controller paths like: from "../controllers/somecontroller.js"
                        # It should become: from "../../controllers/directorynamecontroller/somecontroller.js"
                        
                        # Extract the route subdirectory name (e.g., "bloodbankroute")
                        route_subdir = os.path.basename(root)
                        # Transform it to the controller subdirectory name (e.g., "bloodbankcontroller")
                        controller_subdir = route_subdir.replace('route', 'controller')

                        # Regex to find the incorrect controller paths
                        pattern = r'from "\.\./controllers/([^"]+)"'
                        
                        def replacer(match):
                            return f'from "../../controllers/{controller_subdir}/{match.group(1)}"'

                        content = re.sub(pattern, replacer, content)

                        # Also fix middleware paths like: from "../middlewares/auth.js"
                        content = content.replace('from "../middlewares/auth.js"', 'from "../../middlewares/auth.js"')

                        if content != original_content:
                            print(f"Updating imports in: {file_path}")
                            f.seek(0)
                            f.write(content)
                            f.truncate()

                except Exception as e:
                    print(f"Error processing file {file_path}: {e}")

    print("Finished fixing import paths.")

if __name__ == "__main__":
    fix_import_paths()
