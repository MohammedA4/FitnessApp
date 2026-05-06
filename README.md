# FitAI – Personalised Fitness & Nutrition System

FitAI is a web-based application that generates personalised workout and meal plans based on user data. The system adapts over time using user feedback, creating a dynamic and responsive fitness experience.

---

## 🚀 Features

### 🧠 AI-Driven Personalisation

* Generates workout plans based on:

  * Fitness goal
  * Activity level
  * Experience
* Adjusts difficulty dynamically based on feedback

### 🍽️ Tailored Meal Plans

* Supports multiple dietary preferences:

  * Vegetarian, Vegan, Halal, Gluten-Free
* Supports cultural cuisines:

  * South Asian, Mediterranean, Middle Eastern, East Asian, etc.

### 📈 Adaptive Progression System

* Difficulty levels (1–5) that change based on performance
* Feedback system:

  * Too Easy → Increase difficulty
  * Manageable → Maintain level
  * Too Difficult → Decrease difficulty

### 🔥 Gamification

* Streak tracking
* Badge system
* Weekly summaries
* Progress visualisation (bar charts + activity calendar)

### 📊 Dashboard

* Displays:

  * Daily workouts
  * Meal plans with nutrition breakdown
  * Streak status and reminders
  * Personal records

### ♿ Accessibility Features

* Dark mode
* High contrast mode
* Larger text option

---

## 🖥️ Pages

* **Home (`index.html`)**
  Landing page introducing the system

* **Setup (`setup.html`)**
  User inputs personal data to generate a plan

* **Dashboard (`dashboard.html`)**
  Shows personalised workouts, meals, and progress

* **Feedback (`feedback.html`)**
  User submits workout feedback to adjust difficulty

* **Contact (`contact.html`)**
  Form for support, bugs, and suggestions

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla)

No external frameworks or libraries are used.

---

## ⚙️ How It Works

1. User completes profile setup
2. System generates:

   * Workout plan
   * Meal plan
3. User completes workout
4. User submits feedback
5. System adapts future plans accordingly

All data is stored locally in the browser using JavaScript.

---

## 📂 Project Structure

```
FitAI/
│
├── index.html        # Landing page
├── setup.html        # User input form
├── dashboard.html    # Main personalised plan
├── feedback.html     # Feedback system
├── contact.html      # Support form
│
├── style.css         # Styling
├── app.js            # Core logic & AI behaviour
├── fitai_logo_white.svg
```

---

## ▶️ Running the Project

1. Download or clone the repository
2. Open `index.html` in your browser
3. No installation required

---

## 🎯 Purpose

This project was developed as part of a university coursework (CN6000) to demonstrate:

* User-centred design
* Adaptive systems
* Frontend development skills
* Application of AI-style logic without external APIs

---

## 📌 Future Improvements

* Real AI integration (e.g. OpenAI API)
* Backend database (instead of local storage)
* User accounts and authentication
* Mobile app version
* More advanced nutrition calculations

---

## 👤 Author

Mohammed Abir

---

## 📄 License

This project is for educational purposes.
