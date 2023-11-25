import re
import json

def convert_to_json(input_file, output_file):
    items_list = []

    with open(input_file, 'r') as file:
        lines = file.readlines()

        for line in lines:
            match = re.match(r'\s*(\d+):\s+(\S+)\s+:\s+(.+)', line)
            if match:
                item_id = match.group(1)
                item_code = match.group(2)
                item_name = match.group(3).strip().lower()

                # Check for @ followed by numeric suffix in item_id and add it to the item_name
                numeric_suffix_match = re.search(r'@(\d+)$', item_id)
                if numeric_suffix_match:
                    numeric_suffix = numeric_suffix_match.group(1)
                    item_name += f" @{numeric_suffix}"

                items_list.append({
                    "Id": item_id,
                    "itemId": item_code,
                    "itemsName": item_name
                })

    result = {"items": items_list}

    with open(output_file, 'w') as json_file:
        json.dump(result, json_file, indent=2)

if __name__ == "__main__":
    input_file_path = "item.txt"
    output_file_path = "output.json"

    convert_to_json(input_file_path, output_file_path)
import re
import json

def convert_to_json(input_file, output_file):
    items_list = []

    with open(input_file, 'r') as file:
        lines = file.readlines()

        for line in lines:
            match = re.match(r'\s*(\d+):\s+(\S+)\s+:\s+(.+)', line)
            if match:
                item_id = match.group(1)
                item_code = match.group(2)
                item_name = match.group(3).strip().lower()

                # Check for @ followed by numeric suffix in item_id and add it to the item_name
                numeric_suffix_match = re.search(r'@(\d+)$', item_id)
                if numeric_suffix_match:
                    numeric_suffix = numeric_suffix_match.group(1)
                    item_name += f" @{numeric_suffix}"

                items_list.append({
                    "Id": item_id,
                    "itemId": item_code,
                    "itemsName": item_name
                })

    result = {"items": items_list}

    with open(output_file, 'w') as json_file:
        json.dump(result, json_file, indent=2)

if __name__ == "__main__":
    input_file_path = "file.txt"
    output_file_path = "output.json"

    convert_to_json(input_file_path, output_file_path)
