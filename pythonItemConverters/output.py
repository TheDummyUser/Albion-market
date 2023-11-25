import json

def update_item_names(json_data):
    for item in json_data["items"]:
        item_id = item["itemId"]
        if "@" in item_id:
            suffix = item_id.split("@")[1]
            item["itemsName"] += f"@{suffix}"

if __name__ == "__main__":
    # Load the JSON data from the file
    with open("output.json", "r") as file:
        data = json.load(file)

    # Update item names
    update_item_names(data)

    # Save the modified JSON back to the file
    with open("output_modified.json", "w") as file:
        json.dump(data, file, indent=2)

    print("Modification completed. Check 'output_modified.json'.")
