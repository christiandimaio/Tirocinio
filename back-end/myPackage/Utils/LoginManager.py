from flask_login import LoginManager,login_user,logout_user,current_user

login_manager=None
def createManager(app):
    global login_manager
    if login_manager is None:
        login_manager = LoginManager(app)
    return login_manager

def getManager():
    global login_manager
    return login_manager

def loadUser(user):
    global login_manager
    login_user(user)

def logoutUser():
    logout_user()

def currentUser():
    return current_user