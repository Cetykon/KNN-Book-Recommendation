import csv
from sklearn.preprocessing import LabelEncoder

def encode_publisher(input_file, output_file):
    raw_data = []
    publisher = []

    # Read the CSV file
    with open(input_file, 'r', encoding='utf-8') as infile:
        csv_reader = csv.reader(infile)
        headers = next(csv_reader)
        
        for row in csv_reader:
            raw_data.append(row)
            publisher.append(row[2])  # Author is in column index 1

    # Create a label encoder
    author_encoder = LabelEncoder()

    # Fit and transform the publisher
    publisher_encoded = author_encoder.fit_transform(publisher)

    # Write the encoded data to a new CSV file
    with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        csv_writer = csv.writer(outfile)
        
        # Write headers
        new_headers = headers[:2] + ['Publisher Encoded'] + headers[3:]
        csv_writer.writerow(new_headers)
        
        # Write rows with encoded publisher
        for i, row in enumerate(raw_data):
            encoded_row = row[:2] + [publisher_encoded[i]] + row[3:]
            csv_writer.writerow(encoded_row)

# Example usage
encode_publisher('author_label_encoded_books.csv', 'author_publisher_label_encoded_books.csv')
