
# Roulette of marks

Roulette of marks is a website for survey students on the lectures. The name of student is chosen by random, and the question is given consistently from the list. As a result of the answer, you can put marks: good, so-so and bad. When a student has five answers, website gives him a mark. It significantly makes easy the survey and allows you to be not biased.



## 🛠 Stacks
React, Redux, SASS

The site is adaptive for all types of devices (PC, tablets, phones).


## Run Locally

Clone the project

```bash
  git clone https://github.com/ValeryiaSharova/RoM-Project
```

Go to the project directory

```bash
  cd RoM-Project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_LIST_OF_STUDENTS` - List of students in JSON format.

`REACT_APP_ANSWERS_OAIP`, `REACT_APP_ANSWERS_IPO` - List of answers in JSON format.

Example: 

```bash
{
    `Name`:
        {
            "all": 0,
            "mark": 0
        },
    ...
}
```
`REACT_APP_QUESTIONS_OAIP`, `REACT_APP_QUESTIONS_IPO` - List of questions in JSON format.

`REACT_APP_SECRET_KEY` - Secret key for requests.

I use [JSONbin.io](https://jsonbin.io/create) and for making requests to private JSON files I need this key.

`REACT_APP_PASSWORD` - Password for admin to get access for questions page.

## Usage/Examples

When you first visit this site, you will see the list of pupils answers. In header you can click on an options and change a subject. Also for getting access for questions, marks and saving answers you need to enter the password.



## Demo

Link to deployment: https://rom-project.vercel.app/answers


## Screenshots

Answers page

![App Screenshot](https://i.ibb.co/VMyrmrj/9.png)

Main page

![App Screenshot](https://i.ibb.co/QrwmyK2/10.png)

![App Screenshot](https://i.ibb.co/9rk08kx/11.png)

