# eotApp
Eat On Time webApp with MERN tech stack, pd: M = MariaDB, not Mongo :( 

## Orders valid status
    - 1: Ordenada,
    - 2: En preparación,
    - 3: Lista para servir
    - 4: Servida

## Table valid status
    - 1: Ocupada,
    - 2: Pendiente

## User valid roles
    - 1: Administrador,
    - 2: Mesero,
    - 3: Cocinero

## To do
- [ ] Refactor useConfirmModal hook to use a callback function instead await the update of the state 
- [x] Change stopwatch and use a custom hook instead 
- [x] Use a table instead a div in Table Detail - Orders and change Plate Detail to return a tr instead a div
- [x] Finish Employees Section to be able to add, edit and delete employees
- [x] Refactor Add Plate Page and change his name to Create Order
- [x] Change how we interact with authContext to use a custom hook instead
- [x] Refactor all the login part and use the authContext with a custom hook to handle the login and logout
- [ ] Change how we travel around steps in AddPlate, change its name to orderPlate
- [x] Put all the components of the addPlate in a folder and access them with the index.js

Each component has its own css module for its own styles.  
For general styles we have a global css file named `App.css` in the `src` folder.  

Disclaimer:
In the backend part I prefer use multiple querys instead triggers in the database because some db host doesn't allow triggers in free plans.
