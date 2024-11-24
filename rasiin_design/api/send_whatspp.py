import requests
import json
import frappe
import html
from bs4 import BeautifulSoup
url = "https://api.ultramsg.com/instance91561/messages/chat"
token =  "tp3gce75pfy706ik"
@frappe.whitelist()
def send_to_whatsapp_group(doc, method =None):
    soup = BeautifulSoup(doc.description, 'html.parser')

# Extract plain text
    plain_text = soup.get_text()
    msg = f"""
    Customer Name: {doc.name1 } 


    Issue : {doc.subject}


    Description : {html.unescape(plain_text)}


    Priority : {doc.priority}
    """
    payload = json.dumps({
        "token": token,
        "to": "120363271008881401@g.us",
        "body": msg
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
@frappe.whitelist()
def send_to_personal(doc, method =None):
    # return
    # frappe.msgprint("ok ok ")
 
    mobile_no = frappe.db.get_value("User" , doc.allocated_to , "mobile_no")
    task_doc = frappe.get_doc("Task" , doc.reference_name)
    soup = BeautifulSoup(task_doc.description, 'html.parser')

# Extract plain text
    plain_text = soup.get_text()

    comment = BeautifulSoup(doc.description, 'html.parser')

# Extract plain text
    plain_text = comment.get_text()
    msg = f"""
    Customer Name: {task_doc.name1 } 


    Issue : {task_doc.subject}


    Description : {html.unescape(plain_text)}


    Priority : {task_doc.priority}  

    Assigned Date : {doc.date_}  

    Due Date :{doc.date}  

    Comment : {comment}

    """

    

    payload = json.dumps({
        "token": token,
        "to": mobile_no,
        "body": msg
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    send_assigned_to_whatsapp_group(task_doc , doc)

# send_to_whatsapp_group()

# send_to_personal(mobile_no = "+252612926234" , msg = "Fariin Tijaabo Ah") 




def send_assigned_to_whatsapp_group(task_doc , assigment_doc):
    # return
    soup = BeautifulSoup(assigment_doc.description, 'html.parser')
    doc = task_doc
    plain_text = soup.get_text()
    msg = f"""
    Customer Name: {doc.name1 } 


    Issue : {doc.subject}

    Assigned to:   {assigment_doc.assigned_to}
     
    Assigned Date : {assigment_doc.date_}

    Due Date :  {assigment_doc.date}

    Comment : {plain_text}


    
    """
    payload = json.dumps({
        "token": token,
        "to": "120363271008881401@g.us",
        "body": msg
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)


@frappe.whitelist(allow_guest=True)
def get_whatsapp_app_msg():
    # frappe.msgprint(str(frappe.request.json))
    reci = frappe.new_doc("Receive Whatsapp Message")
    data = frappe.request.json['data']
    # reci.message = data
    reci.message = data['body']
    reci.from_number = data['from']
    reci.name1 = data['pushname']
    reci.message = data['body']
    reci.response = str(frappe.request.json)


    reci.insert(ignore_permissions=True)
    frappe.db.commit()
    return "ok"
    # if frappe.request.method == 'POST':
    #     data = request.json
    #     # Process the received data here
    #     print(f"Received data: {data}")
        
    #     # Respond back to acknowledge receipt of the data
    #     response = {
    #         'status': 'success',
    #         'message': 'Webhook received successfully!',
    #         'data': data
    #     }
    #     return jsonify(response), 200
