import frappe, requests
from datetime import datetime
from frappe.utils import getdate, add_days, date_diff, now_datetime, time_diff_in_seconds
from urllib.parse import urlparse
def has_role(user, role):
    roles = frappe.get_roles(user)
    return role in roles

@frappe.whitelist()
def get_workspace_sidebar_items():
    """Get list of sidebar items for desk"""

    has_access =1
    # don't get domain restricted pages
    allowed_modules = []
    if frappe.db.exists("User Home", frappe.session.user, cache=True):
        user_page = frappe.get_doc("User Home", frappe.session.user).allowed_modules
        
        for page in user_page:
            allowed_modules.append(page.module)
    
    
    filters = {
    
        "name": ["in", allowed_modules],
     }

    if frappe.session.user == "Administrator":
        filters = {}
    if has_role(frappe.session.user , "Full Admin"):
        filters = {}
    # pages sorted based on sequence id
    order_by = "sequence_id asc"
    fields = ["name", "label", 'color',  "module", "icon"]
    all_pages = frappe.get_all(
        "Home Page", fields=fields, filters=filters, order_by=order_by, ignore_permissions=True
    )
    pages = []
    private_pages = []

    return {"pages": all_pages, "has_access": has_access}

@frappe.whitelist()
def app_page():
    msg = ""
    is_expired = False

    company_name = frappe.get_value("Company", filters={}, fieldname="company_name")

    # Get the current datetime
    # current_datetime = datetime(2024, 9, 10, 15, 0, 0)  # For testing
    current_datetime = datetime.now()  # Use this for real-time

    current_date = current_datetime.date()
    current_day = current_date.day
    current_hour = current_datetime.hour

    system_info = get_system_info_from_api()

    found_system = None
    for system in system_info.get("message", []):
        for system_detail in system["system_details"]:
            if system_detail["customer_name"].strip().lower() == company_name.strip().lower():
                found_system = system_detail
                break
        if found_system:
            break

    if found_system:
        system_status = found_system["system_status"].strip().lower()
        status = found_system["status"].strip().lower()
        frappe.errprint(found_system)

        # 1. Manual override: if status is "close" and system_status is "unpaid", system is unusable
        if status == "close" and system_status == "unpaid":
            is_expired = True
            msg = "System is expired due to unpaid, Please contact Rasiin Tech support. +252616918800"
        else:
            # Grace period still active, show remaining time (days or hours)
            if current_day == 10:
                hours_left = 14 - current_hour
                msg = f"System will expire before 2:00 PM."
                if hours_left<1:
                    msg = f"Warning system will expire soon."
            else:
                days_left = 10 - current_day
                msg = f"System will expire in {days_left} days."
                if days_left<1:
                    msg = f"Warning system will expire soon."
            is_expired = False  # System still usable during grace period

            if found_system["leave"]==1:
                msg = f"The System is Active"
        # 3. After the 10th day, check the manual status
        if current_day > 10:
            # If status is "close" and system_status is "unpaid", system is unusable
            if status == "close" and system_status == "unpaid":
                is_expired = True
                msg = "System is expired due to unpaid, Please contact Rasiin Tech support. +252616918800"
            # If status is "open" and system_status is "paid", system is usable
            elif status == "open" and system_status == "paid":
                is_expired = False
                msg = "The System is Active"

        # 4. System usable before grace period (before the 5th day)
        elif current_day < 5:
            if system_status == "paid" and status == "open":
                is_expired = False
                msg = "The System is Active"

    # Get workspace sidebar items and render the page
    data = get_workspace_sidebar_items()['pages']
    # frappe.errprint(data)

    return frappe.render_template("rasiin_design/api/templates/app_page.html", {
        "data": data,
        "message": msg,
        "is_expired": is_expired,
        "company": company_name
    }), "test"


def update_system_status(customer_name, new_status, new_system_status):
    """Update the status and system_status for the given customer in the Systems table"""
    try:
        # Update the `status` and `system_status` in the database
        frappe.db.set_value("Systems Detail", {"customer_name": customer_name}, {
            "status": new_status,
            "system_status": new_system_status
        })
        frappe.db.commit()
    except Exception as e:
        frappe.log_error(f"Failed to update system status for {customer_name}: {str(e)}")


def get_system_info_from_api():
    """Fetch system info from the provided API with token authentication"""
    token = "f64b25a5e27d09d:d196bf6ea497100"
    headers = {
        "Authorization": f"token {token}"
    }

    try:
        response = requests.get(
            "http://104.237.2.9:81/api/method/get_system_info", 
            headers=headers
        )
        if response.status_code == 200:
            return response.json()
        else:
            frappe.log_error(f"API request failed with status code {response.status_code}")
            return {"message": []}
    except Exception as e:
        frappe.log_error(f"Failed to connect to API: {str(e)}")
        return {"message": []}



def get_last_day_of_month(date):
    """Get the last day of the month for a given date."""
    first_day_of_next_month = add_days(date, 31).replace(day=1)
    last_day_of_month = add_days(first_day_of_next_month, -1)
    return last_day_of_month