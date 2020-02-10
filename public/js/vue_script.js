const vm = new Vue({
    el: 'main',
    data: {
        burgers: burgers,
        fullname: '',
        email: '',
        street: '',
        street1: '',
        selected: 'Visa',
        gender: 'male',
        info: '',
    },
    methods: {
        markDone: function() {
            let radios = document.getElementsByName('gender');
            let burgList = document.getElementsByName('userBurger');
            let burgerRes = '';
            for(var j = 0; j < burgList.length; j++) {
                if(burgList[j].checked) {
                    burgerRes = burgerRes + ' ' + burgList[j].value;
                }
            } 
            this.info = fullname.value +' '+ email.value +' '+ street.value +' '+ street1.value +' '+ selected.value +' '+ this.gender +' '+ burgerRes;
  
        }
    },
})

/*
const vm = new Vue({
  el: '#myID',
  data: {
    arbitraryVariableName: 'Välj en burgare2'
  }
})

const vm = new Vue({
  el: '#main',
  data: {
    burger1: 'The Void Burger 60kcal',
    burger2: 'The Cheese Burger 450kcal',
    burger3: 'The Extra Meat-burger 640kcal',
    burger4: 'The Veggie Burger 440kcal',
    burger5: 'The Future Burger 440kcal',
  }
})
<div id="myID">
    <h1>Välj en hamburgare</h1>
    <p v-for="burger in burgers" v-if="burger.allergy">
      {{ burger.name }} {{ burger.kcal}} kcal {{ burger.allergy }}
    </p>    
    <p v-else>
      {{ burger.name }} {{ burger.kcal}} kcal
    </p>
</div>

const vm = new Vue({
  el: '#myID',
  data: {
  burgers: [
  {name: 'The Void Burger', kcal: '60', allergy: 'gluten'}, 
  {name: 'The Chees Burger', kcal: '450', allergy: 'gluten och laktos'},
  {name: 'The Extra Meat-Burger', kcal: '640', allergy: 'gluten och laktos'},
  {name: 'The Veggie Burger', kcal: '440', allergy: 'gluten'},
  {name: 'The Future Burger', kcal: '440', allergy: 'gluten och laktos'},
  ],
    arbitraryVariableName: 'Välj en burgare ' + new Date(),
  }
})
*/
