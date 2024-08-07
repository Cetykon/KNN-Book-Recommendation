import csv
from sklearn.preprocessing import LabelEncoder

def encode_authors(input_file, output_file):
    raw_data = []
    authors = []

    # Read the CSV file
    with open(input_file, 'r', encoding='utf-8') as infile:
        csv_reader = csv.reader(infile)
        headers = next(csv_reader)
        
        for row in csv_reader:
            raw_data.append(row)
            authors.append(row[1])  # Author is in column index 1

    # Create a label encoder
    author_encoder = LabelEncoder()

    # Fit and transform the authors
    author_encoded = author_encoder.fit_transform(authors)

    # Write the encoded data to a new CSV file
    with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        csv_writer = csv.writer(outfile)
        
        # Write headers
        new_headers = headers[:1] + ['Author Encoded'] + headers[2:]
        csv_writer.writerow(new_headers)
        
        # Write rows with encoded author
        for i, row in enumerate(raw_data):
            encoded_row = row[:1] + [author_encoded[i]] + row[2:]
            csv_writer.writerow(encoded_row)

# Example usage
encode_authors('books 4.csv', 'author_label_encoded_books.csv')
