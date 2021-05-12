
# App.js

## JSON & Fragments

The `render` method is what's called a 'lifecycle method'. It runs at a certain point, when the component is loaded. There are other 'lifecycle methods' that you can use, but render is the only one that's actually REQUIRED. 

```Javascript
class App extends Component {
    render(){
        const name = 'John Doe';
        return (
            <div className="App">
                <h1>Hello {name.toUpperCase()}</h1>
            </div>
        );
    }
}
```

This looks like HTML but it's actually JSX (JavaScript Syntax Extension). It's syntactic sugar to be able to write the output of the component in an XML or HTML-like way. Under the hood, it's JS. 

There's a couple of differences between HTML and JSX. One of them is "className" instead of "class" `<div className="App">` and the other is the "for" attribute (i.e. for labels) ==> "forHTML" instead of "for". 

IMPORTANT: The JSX - HAS TO HAVE - one parent element. In our case, everything has to be included inside the div. 

```JavaScript
<div className="App">
    <h1>Hello {name.toUpperCase()}</h1>
</div>
```

If we want to avoid this behavior, we can use -- FRAGMENTS -- <React.Fragment> (this would replace our `<div className="App">`). It's almost like a "ghost" element (because we avoid wrapping our elements inside a div). 

```Javascript
class App extends React.Component {
    render(){
        const name = 'John Doe';
        return (
            <React.Fragment>
                <h1>Hello {name.toUpperCase()}</h1>
            </React.Fragment>
        );
    }
}
```

---
##  🧠  Pro-tip 
if you bring in `Fragment` when you import `React`
```JavaScript
import React, { Fragment, Component } from 'react';
```
You don't need the `React` in `React.Fragment`

```Javascript
<Fragment>
    <h1>Hello {name.toUpperCase()}</h1>
</Fragment>
```
---

Another way to avoid that behavior is also adding empty brackets - <> </> - . 

```Javascript
class App extends React.Component {
    render(){
        const name = 'John Doe';
        return (
            <React.Fragment>
                <h1>Hello {name.toUpperCase()}</h1>
            </React.Fragment>
        );
    }
}
```

## Components, props & types

---
### 👆 Component common convention: 
When naming your component files, the first letter should be Capitalized, i.e., `component/layout/Navbar.js`

---

The way you insert components into your main file (in our case `App.js`) is by exporting the component with the command `export default` 
```JavaScript
export default Navbar
```
and then importing it in the main file with the command  `import from...` and the path to file where the component is located.
```JavaScript
import Navbar from './components/layout/Navbar'
```

## What are props❓
**Props** are basically properties that you can pass _into_ a component from outside. 

For example in our `App.js` file we can pass the property `title` by including it in our `Navbar` tag 
```JavaScript 
<Navbar title="Github Finder">
```
We can use that property in our `Navbar.js` by using curly braces `{}` and accessing the property with the `this` method, `props` and then the name of the property, in this case "title". 
```JavaScript
<nav>
    <h1>
        <i className="fab fa-github" /> {this.props.title}
    </h1>
</nav>
```
---

What happens if you don't pass any properties in the `App.js` file? 
```Javascript
<div className='App'>
        <Navbar //title="Github Finder" icon="fab fa-github" 
        /> 
      </div>
```
They won't show on the view. To prevent that, you can use "default properties". To do this all we have to do in our `Navbar.js` file is create an object with the default properties, in our case: 
```Javascript
static defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github'
    }
```
We created an object with the name `defaultProps` and set its value to equal two properties: `title` and `icon` each with its respective value. That way, even if we don't pass any values in our `App.js` file, there will always be something there by default, but if we write something in the `App.js`, it can override the default. 

---

What are **prop types**?
They're basically "type checking". It'll tell you if your prop should be a string, number, array, etc. In order to use prop types you need to bring it in. 

The way we declare a prop type is to again create an object with the properties we need. In this case, the value of the properties is set to the type of the data. 
```Javascript
static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }
```
Applications work without default types, but it's **good practice** to put them in, it makes your app more robust so you know that your props are the correct data type. 

---

Now our `Navbar.js` component is complete: 
```Javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types'


export class Navbar extends Component {
    static defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github'
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }
    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>
                    <i className={this.props.icon} /> {this.props.title}
                </h1>
            </nav>
        );
    }
}

export default Navbar;
```
---

## Component-level state.

What is **component-level state**?
This just means that your state is contained within a single component. 

---
We'll create a 'user-item' component and give it a 'state'. 
The way we create a user component is similar to what we did with the `Navbar.js` component: 
```Javascript
import React, { Component } from 'react'

class UserItem extends Component {
    
    render() {
        return (
            <div>
                UserItem
            </div>
        )
    }
}

export default UserItem
```
In the same way, you can bring it in to `App.js` by importing it and then introducing it via a `UserItem` _tag_ : 
```Javascript
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className='App'>
        <Navbar />
        <UserItem /> 
      </div>
    );
  }
}

export default App;
```
---

To add 'state' to a 'class-based' component. You can use a **constructor** (not recommended unless you want to use a constructor for something else). 

## Using a constructor (Imma show you anyway...🙄)
The `constructor()` will run every time the component runs, in order to use it, we can place it at the start of our `class` function. 

We start our `constructor()` making a call to `super()`. The `super` keyword is used to access and call functions on an object's parent. When used in a **constructor**, the `super` keyword appears alone and _must_ be used _before_ the `this` keyword is used. It can also be used to call functions on a parent object. 

```Javascript
import React, { Component } from 'react'

class UserItem extends Component {
    constructor() {
        super();
    }
```
---

We can specify tht state of the component inside of the `constructor()` by declaring `this.state = { }`. _State_ is just a javascript object. 
```Javascript
import React, { Component } from 'react'

class UserItem extends Component {
    constructor() {
        super();
        this.state = {
            id: 'id', 
            login: 'mojombo',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            html_url: 'https://github.com/mojombo'
        }
    }
```
In our example, the _State_ of our component has 4 properties: `id`, `login`, `avatar_url` and `html_url`. 

---

What if we want to use it in our `render()`?
In order to use the data in our `render()`, we start by creating an `img` tag to hold the data in the `avatar_url` property of our `UserItem`'s _State_ (`this.state`). In order for the `src` of the `img` to be _dynamic_, we can set it to the variable (in our case the `state` object) that holds the data (i.e. `this.state.avatar_url`).
```Javascript
render() {
        return (
            <div className="card text-center">
                <img src={this.state.avatar_url} alt="" className="round-img" style={{ width: '60px'}}/>
            </div>
        )
    }
```
---
##  🧠  Pro-tip 
You can use inline-CSS in JSX. In order to do so, you need to use **double** curly brackets `{{}}` and _camelCase_ instead of _hyphens(-)_ for properties with more than one word (i.e. `backgroundColor`)

---

## 😩 Is there an easier way to do this?
Sort of... you don't really need a `constructor()` to define the `state`. Remember, the `state` is just an **object**. So we can get rid of the constructor and just declare the `state` as an object: 
```Javascript
state = {
            id: 'id', 
            login: 'mojombo',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            html_url: 'https://github.com/mojombo'
        }
```
---
##  🧠  Pro-tip 
You'll notice we keep repeating the use of `this.state...`. We can use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). 
```Javascript
render() {
        const { login, avatar_url, html_url } = this.state; 
        // 👆 this line is de-structuring this.state so that we don't have to repeat `this.state...` in our code.
         
        return (
            <div className="card text-center">
                <img src={avatar_url} alt="" className="round-img" style={{ width: '60px'}}/>
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
                </div>
            </div>
        )
    }
```
The curly braces in `const {} = this.state` signify destructuring. They _pull_ the values from `this.state`. In our case, the values we want are `login`, `avatar_url` and `html_url`.

---

This is great, we have our `UserItem` component and this component has its own defined `state` 🎉. 

However, we don't want just **one** user. We want to have multiple users, we want to loop through each user and we want to output the `UserItem` component for _each_ user. 

For that, we create the `Users` component. This component **wraps** around the `UserItem` of each user and then we'll have the **State** of the `Users` component _loop_ through the array of users and output the `UserItem` for each one. 

The way we'll get the data _into_ the `UserItem` is through...props!

---

## Lists & passing state with Props

Up to this point, we only have a `UserItem` component that has the state that includes a single user. That's not what we want. 

What we want is a `Users` component that includes an array of users that we can loop through and then output a `UserItem` component _for each user_ rather than just having a single `UserItem` component embedded in the `App.js`.

To create the new `Users` component, we can simply create a new file `Users.js` in our `/components/users` path and then generate a component. 

---
##  🧠  Pro-tip 
If you're using the ES7 React/Redux, etc plugin by dsznajder, you can use the shortcut `rce` to insert a simple component template. 

---

Once we've created our template for our `Users.js` component, we can add a state to it. We can do that just as we did with the `UserItem` state, declaring an object this time it will be an array of users. (We'll hard code users at first and later comment them out as the data will come from an API).

Now we'll loop through our users inside the `render()`. We'll create a `div`, and inside it we'll put an expression (using `{}`).Inside the curly braces we'll put this expression `{this.state.users}` so we can access all of the users. To loop through all the users, we add the `.map()` method at the end. `.map()` is a  
[High-order function](https://eloquentjavascript.net/05_higher_order.html) that takes in a function. We are going to use a [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) that will take in a parameter `user` that represents each one of the users. 

In order to use our `User` component, we need to `import` it in our `App.js` file. We no longer need the `UserItem` component so we can replace it with the `User` component. 
```Javascript
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
```
We can also replace the `UserItem` tag inside the `<div className='App'>` for a `Users` tag: 
```Javascript
<div className='App'>
    <Navbar />
    <Users /> 
    // <UserItem />
</div>
```

---

## ⚠️ IMPORTANT 
Whenever you have a list, each child in the list should have a unique "key" prop. So we'll go to our `Users.js` file and we'll add that key to the element that is being iterated over in our `map` arrow function: 
```Javascript
<div>
    {this.state.users.map(user => (
        <div key={user.id} {user.login}/>
    ))}
</div>
```
We'll use `user.id` as our `key` because it's **unique**. 

---

Now, instead of just setting the output to a `div` for each of the users in the `state`, I want to output a `UserItem`, which is the component we've already created. 

To do this, we need to first `import` our `UserItem` component... 
```Javascript
import UserItem from './UserItem'
// UserItem is in the same folder as Users so we don't need the rest of the path. 
```
and **replace** the `<div />` with a `<UserItem />` tag.
```Javascript
<div>
    {this.state.users.map(user => (
        <UserItem key={user.id} user={user}/>
    ))}
</div>
```
We also got rid of the `{user.login}` after the `key` and replaced it with the _entire_ user. 

---
💡 REMEMBER: What we are doing here, is looping through the _users in the state_ (i.e. `this.state.users`) and _for each one_ (i.e. `.map()`), the variable `user` is used to represent the WHOLE user object, i.e.: 
```Javascript
{
    id: '1',
    login: 'mojombo',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo'
}, 
```
What we are doing in passing in this 👆 object as a `prop` to `UserItem` (i.e.`<UserItem key={user.id} user={user}/>`)

---

ALSO...
We're not done just yet. 

If we save it and see the page, we'll notice that it just shows the same object three different times. The reason for that is that it is in fact outputting `UserItem`, but `UserItem` is still using the `state` we hard-coded, which is just one user. We'll comment it out and use `props` to pass the `UserItem` object into the `User` component. 

The last thing we need to change in `UserItem.js` is that we no longer need to pull the values for `this.user.state` but from `this.props.user`(because in our **User** component we passed in each individual user because we mapped (`.map()`) through each `user` in our **Users** component) so we'll change our `render()` to reflect this and our `UserItem` component looks like this:
```Javascript
import React, { Component } from 'react'

class UserItem extends Component {
    render() {
        const { login, avatar_url, html_url } = this.props.user;
        
        return (
            <div className="card text-center">
                <img src={avatar_url} alt="" className="round-img" style={{ width: '60px'}}/>
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
                </div>
            </div>
        )
    }
}

export default UserItem
```

---

And our `Users.js` component looks like this: 
```Javascript
import React, { Component } from 'react'
import UserItem from './UserItem'

class Users extends Component {
    state = {
        users: [
            {
                id: '1',
                login: 'mojombo',
                avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
                html_url: 'https://github.com/mojombo'
            }, 
            {
                id: '2',
                login: "defunkt",
                avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
                html_url: "https://github.com/defunkt"
            },
            {
                id: '3',
                login: "pjhyett",
                avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
                html_url: "https://github.com/pjhyett",
            }
        ]
    }
    render() {
        return (
            <div style={userStyle}>
                {this.state.users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
```
---



