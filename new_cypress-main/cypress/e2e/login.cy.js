import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {
    
    beforeEach('Начало теста', function () {
    cy.visit('/');
    cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
      });

    afterEach('Конец теста', function () {
    cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
       });

    it('Верный пароль и верный логин', function () {
         cy.get('#mail').type(data.login) // Вести верный логин
         cy.get('#pass').type(data.password) // Вести правильный пароль
         cy.get('#loginButton').click(); // Нажал на кнопку войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверить, что авторизация прошла успешно 
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю  
         
       
     })

     it('НЕверный пароль и верный логин', function () {
        
        cy.get('#mail').type(data.login) // Вести верный логин
        cy.get('#pass').type('Wrongpass') // Вести НЕправильный пароль
        cy.get('#loginButton').click(); // Нажал на кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверить, что авторизация не прошла 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю  
        

      
    })

    it('Верный пароль и НЕверный логин', function () {
        
        cy.get('#mail').type('pokemons@mail.ru ') // Вести НЕверный логин
        cy.get('#pass').type(data.password) // Вести правильный пароль
        cy.get('#loginButton').click(); // Нажал на кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверить, что авторизация не прошла 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю  
       
      
    })

    it('Верный пароль и ввести логин без @', function () {
       
        cy.get('#mail').type('germandolnikov.ru ') // Вести логин без @
        cy.get('#pass').type(data.password) // Вести правильный пароль
        cy.get('#loginButton').click(); // Нажал на кнопку войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверить, что авторизация не прошла
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю  
       
      
    })
    
    it('Верный пароль и верный ЛоГиН', function () {
        
        cy.get('#mail').type('GeRmAn@DoLnIkOv.Ru ') // Вести  ЛоГиН
        cy.get('#pass').type(data.password) // Вести правильный пароль
        cy.get('#loginButton').click(); // Нажал на кнопку войти

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверить, что авторизация прошла успешно 
           //  Разработчик допустил баг в этом месте и не реализовал пункт #2 из требований.
           //  Тест должен упасть — и это ок (то есть мы этим тестом поймали баг, который допустил разработчик)
 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю  
        
      
    })
    
    it('Забыли пароль', function () {
        
        cy.get('#forgotEmailButton').click(); // Нажал на кнопку забыли пароль
        cy.get('#mailForgot').type(data.login) // Вести верный логин
        cy.get('#exitRestoreButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
        cy.get('#restoreEmailButton').click(); // Нажал на кнопкe отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверить, что код отправлен
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю  
       
      
    })

       
 
 })


 