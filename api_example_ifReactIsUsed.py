# # pip install flask 
# # is nessesary

# from flask import Flask, request, jsonify
# from flask_cors import CORS

# import Web_Cycle
# import prompt_utils
# from Open_API_Setup import get_completion
# from minimize_tokens_utils import no_brackets_array_to_string

# app = Flask(__name__)
# # for all routes
# CORS(app)

# @app.route('/chatbot', methods=['POST'])
# def chatbot():
#     data = request.json
#     user_input = data.get('message')
#     preliminary_info = data.get('preliminaryInfo')
#     conversation_Array = data.get('conversationArray')
#     ending_condition_met = data.get('endingConditionMet')

#     if not ending_condition_met:
#         response, ending_condition_met = Web_Cycle.cycle(preliminary_info, user_input, conversation_Array)
#         return jsonify({'completion': response, 'end': ending_condition_met})
#     else:
#         # Once conversation is over, it does a final print
#         previous_messages = no_brackets_array_to_string(conversation_Array)
#         print(f"CONVERSATION COMPLETE: {preliminary_info}\n{previous_messages}")
#         return jsonify({'completion': "CONVERSATION COMPLETE"})


# if __name__ == '__main__':
#     # Run script directly to start Flask server.
#     # Change host and port. Update constants.js in iepchatbot/src to use the correct host and port.
#     app.run(debug=True, host="127.0.0.1", port=5000)
