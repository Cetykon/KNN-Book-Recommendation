import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# Sample data
d = {
    'attributeToHotEcode': ['cat', 'dog', 'cat', 'bird'],
    'atribute': ['A', 'B', 'A', 'C'],
    'originalAtribute': ['val1', 'val2', 'val3', 'val4']
}

df = pd.DataFrame(data=d)
print(df.head())

# Taking a look at every unique value
print(df['attributeToHotEcode'].unique())

# OneHotEncoder setup and transformation
ohe = OneHotEncoder(handle_unknown='ignore', sparse_output = False).set_output(transform='pandas')
ohetransform = ohe.fit_transform(df[['atribute']])

# Concatenating and dropping columns
df = pd.concat([df, ohetransform], axis=1).drop(columns=['originalAtribute'])
print(df.head(10))
