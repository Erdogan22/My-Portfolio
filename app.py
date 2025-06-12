from flask import Flask, render_template, request, redirect, url_for, flash
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email
import requests
import markdown
import os
from datetime import datetime
import smtplib
from dotenv import load_dotenv
load_dotenv()
# load_dotenv(os.path.join('venv', '.env'))


app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('FLASK_KEY')

class ContactForm(FlaskForm):
    name = StringField('Nom', validators=[DataRequired()])
    email = StringField('Email', validators=[Email(), DataRequired()])
    message = TextAreaField('Message', validators=[DataRequired()])
    submit = SubmitField('Envoyer', render_kw={"class": "submit-btn"})

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    github_repos = []
    try:
        response = requests.get(os.environ.get('GIT_API_USERNAME'), timeout=10)  
        if response.status_code == 200:
            github_repos = response.json()
    except Exception as e:
        print("GitHub API error:", e)
    return render_template('projects.html', repos=github_repos)

@app.route('/cv')
def cv():
    return render_template('cv.html')

@app.route('/About')
def About():
    return render_template('About.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if request.method == 'POST' and form.validate_on_submit():
        send_email(form.name.data, form.email.data, form.message.data)
        flash("Message sent successfully!", "success")
        return redirect(url_for('contact'))
    return render_template('contact.html', form=form)

def send_email(name, email, message):
    try:
        with smtplib.SMTP('smtp.gmail.com', 587, timeout=300) as server:
            server.starttls()
            server.login(os.environ.get('OWN_EMAIL'), os.environ.get('OWN_PASSWORD'))  
            subject = f"Message from {name}"
            body = f"From: {name} <{email}>\n\n{message}"
            msg = f'Subject: {subject}\n\n{body}'
            server.sendmail(email, os.environ.get('OWN_EMAIL'), msg)
            print("Email sent successfully")
    except Exception as e:
        print("Failed to send email:", e)
        
        
@app.context_processor
def inject_now():
    return {'now': datetime.now()}


@app.route('/blog/<slug>')
def article(slug):
    path = f'blog/{slug}.md'
    if not os.path.exists(path):
        return "Article non trouvé", 404

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        html_content = markdown.markdown(content)

    return render_template('blog/article.html', content=html_content, title=slug.replace('-', ' ').capitalize())


if __name__ == '__main__':
    app.run(debug=True)
