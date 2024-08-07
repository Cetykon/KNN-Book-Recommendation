import csv
from collections import Counter

def top_ten_user_ids(file_path):
    user_ids = []

    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            user_id = row['UserID'].strip()
            if user_id:  # Only add non-empty user_ids
                user_ids.append(user_id)

    # Count occurrences of each user_id
    user_id_counts = Counter(user_ids)
    
    # Find the top ten most common user_ids
    top_ten = user_id_counts.most_common(10)
    
    return top_ten

# Example usage
file_path = 'ratingsV3.csv'
top_ten = top_ten_user_ids(file_path)
if top_ten:
    print("Top 10 most frequent User_ids:")
    for user_id, count in top_ten:
        print(f"User_id: {user_id}, Count: {count}")
else:
    print("No valid User_id found.")
