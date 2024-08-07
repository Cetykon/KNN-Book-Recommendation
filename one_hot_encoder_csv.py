import pandas as pd
# use MultiLabel for fields with arrays
from sklearn.preprocessing import MultiLabelBinarizer
# use one HotEncoder for regular fields
from sklearn.preprocessing import OneHotEncoder
# use to Label Encode
from sklearn.preprocessing import LabelEncoder
import ast

def hot_encode_categories():
    
    df = pd.read_csv('books_data.csv')

    # Display the first 10 rows of the DataFrame
    print("Original DataFrame:")
    print(df.head(10))

    # Preprocess the 'categories' column as their is more than one category in the string
    def parse_list(list_str):
        try:
            return ast.literal_eval(list_str)
        except (ValueError, SyntaxError):
            return []

    df['categories'] = df['categories'].apply(parse_list)

    # Apply OneHotEncoder using MultiLabelBinarizer
    mlb = MultiLabelBinarizer()
    categories_encoded = mlb.fit_transform(df['categories'])

    # Convert the result to a DataFrame and set the column names
    categories_df = pd.DataFrame(categories_encoded, columns=mlb.classes_)

    # Concatenate the original DataFrame with the encoded categories and drop the original 'categories' column and other unnecessary ones
    df = pd.concat([df, categories_df], axis=1).drop(columns=['categories', 'description', 'previewLink', 'infoLink', 'image'])

    # Display the first 10 rows of the modified DataFrame
    print("Modified DataFrame:")
    print(df.head(10))

    # Export the modified DataFrame to a new CSV file
    df.to_csv('modified_data_1.csv', index=False)
    
def hot_encode_authors():
    
    df = pd.read_csv('books 4.csv')

    # Display the first 10 rows of the DataFrame
    print("Original DataFrame:")
    print(df.head(10))

    # Preprocess the 'authors' column as their is more than one author in the string
    def parse_list(list_str):
        try:
            return ast.literal_eval(list_str)
        except (ValueError, SyntaxError):
            return []

    df['Authors'] = df['Authors'].apply(parse_list)

    # Apply OneHotEncoder using MultiLabelBinarizer
    mlb = MultiLabelBinarizer()
    authors_encoded = mlb.fit_transform(df['Authors'])

    # Convert the result to a DataFrame and set the column names
    authors_df = pd.DataFrame(authors_encoded, columns=mlb.classes_)

    # Concatenate the original DataFrame with the encoded categories and drop the original 'authors' column
    df = pd.concat([df, authors_df], axis=1).drop(columns=['Authors'])

    # Display the first 10 rows of the modified DataFrame
    print("Modified DataFrame:")
    print(df.head(10))

    # Export the modified DataFrame to a new CSV file
    df.to_csv('booksV4_HotEncoded_Authors.csv', index=False)
    
def hot_encode_publishers():
    
    df = pd.read_csv('books3.csv')
    
    print("Original DataFrame:")
    print(df.head(10))

    # Taking a look at every unique value
    print(df['Publisher'].unique())

    # OneHotEncoder setup and transformation
    ohe = OneHotEncoder(handle_unknown='ignore', sparse_output = False).set_output(transform='pandas')
    ohetransform = ohe.fit_transform(df[['Publisher']])

    # Concatenating and dropping columns
    df = pd.concat([df, ohetransform], axis=1).drop(columns=['Publisher'])
    print("Modified DataFrame:")
    print(df.head(10))
    
    # Export the modified DataFrame to a new CSV file
    df.to_csv('books_publisher_hot_encode.csv', index=False)
    
              
def main():
    
    #hot_encode_categories() # Their is a lot of categories and some are even sentences, so dropping records with this over the top categories may need to be dropped.
    hot_encode_authors() # Not enough memory allocation to process, I have 32gb of ram running at 6400Mhz
    #hot_encode_publishers()
    
if __name__ == "__main__":
    main()