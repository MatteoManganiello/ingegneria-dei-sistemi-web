const Login = {
    template: `
    <div class="container">
        <h2 class="text-center">Accedi</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Accedi</button>
        </form>
    </div>
    `,
    data() {
        return { username: "", password: "" };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });
  
                if (response.ok) {
                    const result = await response.json();
                    const user = {
                        username: this.username,
                        address: result.address || "", // Assicurati che l'API restituisca questi dati
                        phone: result.phone || "", // Assicurati che l'API restituisca questi dati
                    };
  
                    localStorage.setItem("token", result.token); // Salva il token
                    localStorage.setItem("user", JSON.stringify(user)); // Salva i dati dell'utente
                    alert("Login effettuato con successo!");
                    this.$router.push("/"); // Reindirizza alla homepage
                } else {
                    const error = await response.text();
                    alert(`Errore: ${error}`);
                }
            } catch (error) {
                console.error("Errore durante il login:", error);
                alert("Errore durante il login. Riprova più tardi.");
            }
        },
    },
  };
  
          
  const Register = {
    template: `
    <div class="container">
        <h2 class="text-center">Registrati</h2>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="indirizzo">Indirizzo</label>
                <input type="text" id="indirizzo" v-model="indirizzo" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="telefono">Numero di Telefono</label>
                <input type="tel" id="telefono" v-model="telefono" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Registrati</button>
        </form>
    </div>
    `,
    data() {
        return {
            username: "",
            password: "",
            indirizzo: "", 
            telefono: "", 
        };
    },
    methods: {
        async handleRegister() {
            try {
                const response = await fetch("http://localhost:3000/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                        indirizzo: this.indirizzo, 
                        telefono: this.telefono, 
                    }),
                });
  
                if (response.ok) {
                    alert("Registrazione completata con successo!");
                    // Salva i dati dell'utente nel localStorage
                    const user = {
                        username: this.username,
                        indirizzo: this.indirizzo, 
                        telefono: this.telefono, 
                    };
                    localStorage.setItem("user", JSON.stringify(user));
  
                    this.$router.push("/Login"); // Reindirizza alla pagina di login
                } else {
                    const error = await response.text();
                    alert(`Errore: ${error}`);
                }
            } catch (error) {
                console.error("Errore durante la registrazione:", error);
                alert("Errore durante la registrazione. Riprova più tardi.");
            }
        },
    },
  };
  
            
  
   
          
  
  const Home = {
    data() {
      return {
        articoli: [
          {
            image: "./immagini/BUYBurger.png",
            text: "\uD83C\uDF54Scopri tutto ciò che abbiamo da offrire.\uD83C\uDF54",
            alt: "Logo di BUYBurger con sfondo colorato",
          },
          {
            image: "./immagini/varietà.png",
            text: "\uD83C\uDF54Trova il panino perfetto che soddisfa i tuoi gusti.\uD83C\uDF54",
            alt: "Una varietà di panini su un tavolo",
          },
          {
            image: "./immagini/uomoBuyBurger.png",
            text: "\uD83C\uDF54Concediti il ​​piacere unico dei nostri panini.\uD83C\uDF54",
            alt: "Un uomo che gusta un panino di BUYBurger",
          }
        ]
      };
    },
  
    template: `
  <div class="container">
    <div class="row">
      <div class="col-md-4" v-for="(articolo, index) in articoli" :key="index">
        <div class="card">
          <img :src="articolo.image" :alt="articolo.alt" class="card-img-top">
          <div class="card-body">
            <p class="card-text" style="font-size: 25px;">{{ articolo.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  };
  
  
  const Compra = {
    template: `
  <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
    <!-- Conteggio calorie -->
    <div 
      style="position: fixed; top: 100px; left: 10px; background-color: white; color: black; border: 2px solid black; border-radius: 10px; padding: 15px; text-align: center; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); z-index: 1000; max-width: 250px;"
    >
      <h4 style="margin: 0; font-size: 16px; font-weight: bold;">Calorie Totali</h4>
      <p style="margin: 10px 0; font-size: 20px; font-weight: bold;">{{ totalCalories }} kcal</p>
      <div v-if="calorieLevel === 'basso'" style="color: #2a9d8f; font-size: 16px;">Livello: Basso</div>
      <div v-if="calorieLevel === 'medio'" style="color: #ffcc00; font-size: 16px;">Livello: Medio</div>
      <div v-if="calorieLevel === 'alto'" style="color: #e63946; font-size: 16px;">Livello: Alto</div>
      <p v-if="customizationMessage" style="margin-top: 10px; font-size: 12px; color: #e63946; font-style: italic;">
        Le calorie possono variare in base alla personalizzazione.
      </p>
    </div>
  
    <!-- Icona del carrello -->
    <div 
      style="position: fixed; top: 100px; right: 10px; cursor: pointer; background-color: #87CEEB; color: white; border-radius: 50%; width: 70px; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: bold;"
      @click="toggleCart"
    >
      🛒{{ cartTotal }}
    </div>
  
    <!-- Messaggio di avviso -->
    <div v-if="totalCalories > calorieThresholds.alto" 
      style="position: fixed; bottom: 20px; left: 10px; background-color: #e63946; color: white; padding: 10px 15px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
      <p style="margin: 0; font-weight: bold;">Attenzione!</p>
      <p style="margin: 0;">È sconsigliato mangiare tutto questo cibo da solo!</p>
    </div>
  
    <!-- Pannello Carrello -->
    <div 
      v-if="cartVisible" 
      style="position: fixed; top: 180px; right: 10px; width: 400px; background-color: white; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; z-index: 1000; max-height: 300px; overflow-y: auto;"
    >
      <h3 style="text-align: center; margin: 0 0 15px;">Carrello</h3>
      <ul v-if="cart.length" style="list-style: none; padding: 0;">
        <li 
          v-for="item in cart" 
          :key="item.id" 
          style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px;"
        >
          <div>
            <h4 style="margin: 0;">{{ item.name }}</h4>
            <p style="margin: 0;">{{ item.quantity }} x {{ item.price }} €</p>
            <p style="margin: 0;">{{ item.calorie * item.quantity }} kcal</p>
            <p v-if="item.customization" style="margin: 0; font-size: 12px; color: #555; font-style: italic;">
              Personalizzazione: {{ item.customization }}
            </p>
          </div>
          <div>
            <button 
              v-if="item.customization" 
              @click="removeCustomization(item)" 
              style="background-color: #f86106; color: white; border: none; border-radius: 5px; padding: 5px 10px; margin-bottom: 5px; cursor: pointer;">
              Rimuovi Personalizzazione
            </button>
            <button 
              @click="removeFromCart(item)" 
              style="background-color: #e63946; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">
              Rimuovi
            </button>
          </div>
        </li>
      </ul>
      <p v-else style="text-align: center; color: #888;">Il carrello è vuoto.</p>
      <button 
        @click="placeOrder" 
        style="background-color: #2a9d8f; color: white; border: none; border-radius: 8px; padding: 15px 20px; cursor: pointer; display: block; margin: 20px auto 0;"
      >
        Completa Ordine
      </button>
    </div>
  
    <!-- Menu -->
    <div style="width: 80%; max-width: 800px;">
      <h2 style="text-align: center; margin-bottom: 20px;">🍔 Menu 🍔</h2>
  
      <!-- Bottoni per selezionare la categoria -->
      <div style="text-align: center; margin-bottom: 30px;">
        <button 
          @click="currentCategory = 'burgers'" 
          style="margin-right: 10px; padding: 15px 25px; background-color: #f86106; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
          Panini
        </button>
        <button 
          @click="currentCategory = 'fries'" 
          style="margin-right: 10px; padding: 15px 25px; background-color: #f86106; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
          Patatine
        </button>
        <button 
          @click="currentCategory = 'drinks'" 
          style="padding: 15px 25px; background-color: #f86106; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
          Bevande
        </button>
      </div>
  
      <!-- Prodotti della categoria selezionata -->
      <div v-if="currentItems.length">
        <div 
          v-for="item in currentItems" 
          :key="item.id" 
          style="border: 1px solid #ccc; border-radius: 8px; margin-bottom: 20px; padding: 15px; display: flex; align-items: center;">
          <img 
            :src="item.image" 
            :alt="'Immagine di ' + item.name" 
            style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-right: 15px;">
          <div>
            <h3 style="margin: 0 0 10px;">{{ item.name }}</h3>
            <p style="margin: 0 0 5px; font-size: 14px; color: #555;">{{ item.description }}</p>
            <p style="margin: 0 0 10px; font-weight: bold;">Prezzo: {{ item.price }} €</p>
            <p style="margin: 0 0 10px; font-size: 14px; color: #888;">Calorie: {{ item.calorie }} kcal</p>
            <button 
              v-if="currentCategory === 'burgers'" 
              @click="customizeItem(item)" 
              style="background-color: #ffcc00; color: black; border: none; border-radius: 8px; padding: 8px 12px; margin-right: 10px; cursor: pointer;">
              Personalizza
            </button>
            <button 
              @click="addToCart(item, currentCategory)" 
              style="background-color: #f86106; color: white; border: none; border-radius: 8px; padding: 8px 12px; cursor: pointer;">
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
      <p v-else style="text-align: center; font-size: 18px; color: #888;">Nessun prodotto disponibile.</p>
    </div>
  </div>
    `,
    data() {
      return {
        burgers: [],
        fries: [],
        drinks: [],
        cart: [],
        cartVisible: false,
        currentCategory: 'burgers',
        totalCalories: 0,
        calorieLevel: 'basso',
        calorieThresholds: { basso: 1000, medio: 2000, alto: 2500 },
        customizationMessage: false, // Per mostrare il messaggio di variazione calorie
      };
    },
    computed: {
      currentItems() {
        if (this.currentCategory === 'burgers') return this.burgers;
        if (this.currentCategory === 'fries') return this.fries;
        if (this.currentCategory === 'drinks') return this.drinks;
        return [];
      },
      cartTotal() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
      }
    },
    mounted() {
      this.fetchData("burgers");
      this.fetchData("fries");
      this.fetchData("drinks");
    },
    methods: {
      fetchData(type) {
        fetch(`http://localhost:3000/api/${type}`)
          .then((response) => response.json())
          .then((data) => {
            this[type] = data.map(item => ({ ...item, type }));
          })
          .catch((error) =>
            console.error(`Errore nel caricamento dei dati ${type}:`, error)
          );
      },
      addToCart(item, type) {
        const existingItem = this.cart.find((i) => i.id === item.id && i.type === type);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.cart.push({ ...item, type, quantity: 1 });
        }
        this.calculateCalories();
      },
      removeFromCart(item) {
        this.cart = this.cart.filter((i) => i.id !== item.id || i.type !== item.type);
        this.calculateCalories();
      },
      calculateCalories() {
        this.totalCalories = this.cart.reduce((sum, item) => sum + item.calorie * item.quantity, 0);
        if (this.totalCalories <= this.calorieThresholds.basso) this.calorieLevel = 'basso';
        else if (this.totalCalories <= this.calorieThresholds.medio) this.calorieLevel = 'medio';
        else this.calorieLevel = 'alto';
      },
      toggleCart() {
        this.cartVisible = !this.cartVisible;
      },
      placeOrder() {
        const cart = this.cart;
        if (cart.length === 0) {
          alert("Il carrello è vuoto!");
          return;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.$router.push("/ConfermaOrdine");
      },
      customizeItem(item) {
        const customization = prompt(`Personalizza ${item.name}:
  (es. Togli il formaggio, Aggiungi insalata)`);
        if (customization) {
          item.customization = customization;
          this.customizationMessage = true; // Mostra il messaggio nella vignetta delle calorie
        }
      },
      removeCustomization(item) {
        item.customization = null;
        this.customizationMessage = this.cart.some(i => i.customization); 
      },
    },
  };
  
  
  const ConfermaOrdine = {
    template: `
    <div class="container">
        <h2 class="text-center">Conferma il tuo ordine</h2>
        <form @submit.prevent="finalizeOrder">
            <div class="form-group">
                <label for="customer_name">Nome</label>
                <input type="text" id="customer_name" v-model="customer_name" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="customer_address">Indirizzo di spedizione</label>
                <input type="text" id="customer_address" v-model="customer_address" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="customer_phone">Numero di telefono</label>
                <input type="tel" id="customer_phone" v-model="customer_phone" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="customer_notes">Altre informazioni sulla spedizione</label>
                <textarea id="customer_notes" v-model="customer_notes" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Conferma Ordine</button>
        </form>
    </div>
    `,
    data() {
        return {
            customer_name: "",
            customer_address: "",
            customer_phone: "",
            customer_notes: "",
        };
    },
    mounted() {
        // Recupera i dati dell'utente salvati durante il login
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.customer_name = user.username || ""; // Precompila solo il nome utente
        }
    },
    methods: {
        async finalizeOrder() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Il carrello è vuoto!");
                return;
            }
  
            const order = {
                customer_name: this.customer_name,
                customer_address: this.customer_address,
                customer_phone: this.customer_phone,
                customer_notes: this.customer_notes,
                items: cart,
            };
  
            try {
                const response = await fetch("http://localhost:3000/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(order),
                });
  
                if (response.ok) {
                    alert("Ordine completato con successo!");
                    localStorage.removeItem("cart"); // Svuota il carrello
                    this.$router.push("/"); // Reindirizza alla homepage
                } else {
                    const error = await response.text();
                    alert(`Errore: ${error}`);
                }
            } catch (error) {
                console.error("Errore durante l'invio dell'ordine:", error);
                alert("Errore durante l'invio dell'ordine. Riprova più tardi.");
            }
        },
    },
  };
  
  
  
  
  
  const Scopri = { 
  
    data() {
      return {
        articoli: [
          {
            image: "./immagini/online.jpg",
            text: "Cerchi il burger perfetto? 🍔 Scopri il nostro sito per i migliori burger, ingredienti freschi e sapori unici che soddisfano ogni palato! 🌟 Visita BuyBurger e lascia che il gusto parli da sé!",
            alt: "Burger appetitoso su sfondo con dettagli promozionali"
          },
          {
            image: "./immagini/cucina.jpg",
            text: "I nostri burger sono arte, i nostri cuochi gli artisti! 👨‍🍳🍔 Scopri la maestria dei nostri chef su BuyBurger: passione, qualità e creatività per burger che lasciano il segno. 🌟 Visita buyburger.com!",
            alt: "Chef che prepara un burger con ingredienti freschi"
          },
          {
            image: "./immagini/furgoncino.jpg",
            text: "Il gusto dei nostri burger arriva direttamente a casa tua! 🚚🍔 Con BuyBurger, spedizioni veloci e garantite per assaporare la qualità ovunque tu sia. Ordina ora su buyburger.com!",
            alt: "Furgoncino per consegne di burger con logo BuyBurger"
          },
          {
            image: "./immagini/prezzi.jpg",
            text: "Qualità al top, prezzi al minimo! 🍔💰 Su BuyBurger trovi i burger più buoni senza spendere una fortuna. Gusto irresistibile, prezzi imbattibili: ordina ora su buyburger.com!",
            alt: "Cartellino prezzi con burger e offerta speciale"
          },
          {
            image: "./immagini/ingredienti.jpg",
            text: "Solo il meglio nei nostri burger! 🥩🍅 Su BuyBurger utilizziamo ingredienti di prima qualità, freschi e selezionati con cura per offrirti un gusto autentico e irresistibile. Scopri la differenza su buyburger.com!",
            alt: "Ingredienti freschi per burger: carne, pomodori, lattuga"
          },
          {
            image: "./immagini/codiceqr.jpg",
            text: "Resta connesso con il mondo di BuyBurger! 🍔📲 Scansiona i nostri codici QR per seguirci sui social e non perderti novità, offerte esclusive e dietro le quinte del nostro gusto unico. 🖤🍟",
            alt: "Codice QR per accedere ai profili social di BuyBurger"
          }
        ]
      };
    },
    
  
  template: `
  <div class="container">
  <div class="row">
    <div class="col-md-4" v-for="(articolo, index) in articoli" :key="index">
      <div class="card">
        <img :src="articolo.image" :alt="articolo.alt" class="card-img-top">
        <div class="card-body">
          <p class="card-text" style="font-size: 25px;">{{ articolo.text }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  
  
  `
  };
  
  const SiteReviews = {
    template: `
    <div class="container">
  
        <!-- Modulo per lasciare una recensione -->
        <form @submit.prevent="submitReview" class="mb-4">
            <h3>Lascia una Recensione ✒️</h3>
            <div class="form-group">
                <label for="username">Nome:</label>
                <input id="username" v-model="newReview.username" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Valutazione:</label>
                <div>
                    <span 
                        v-for="star in 5" 
                        :key="star" 
                        @click="setRating(star)"
                        @mouseover="hoverRating(star)"
                        @mouseleave="hoverRating(0)"
                        :style="{
                            fontSize: '2.5rem', 
                            cursor: 'pointer',
                            color: star <= (hoverRatingValue || newReview.rating) ? 'gold' : 'gray'
                        }"
                    >
                        {{ star <= (hoverRatingValue || newReview.rating) ? '★' : '☆' }}
                    </span>
                </div>
            </div>
            <div class="form-group">
                <label for="comment">Commento:</label>
                <textarea id="comment" v-model="newReview.comment" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-success">Invia Recensione</button>
        </form>
  
        <!-- Lista delle recensioni -->
        <div>
            <h3>Recensioni Recenti</h3>
            <ul>
                <li v-for="review in reviews" :key="review.id" class="mb-3">
                    <strong>{{ review.username }}</strong> - 
                    <span>
                        <span 
                            v-for="star in 5" 
                            :key="star"
                            :style="{
                                fontSize: '2rem', 
                                color: star <= review.rating ? 'gold' : 'gray'
                            }"
                        >
                            {{ star <= review.rating ? '★' : '☆' }}
                        </span>
                    </span>
                    <p>{{ review.comment }}</p>
                    <small>Inserito il {{ new Date(review.created_at).toLocaleString() }}</small>
                </li>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            reviews: [],
            newReview: {
                username: "",
                rating: null,
                comment: "",
            },
            hoverRatingValue: 0,
        };
    },
    mounted() {
        this.fetchReviews();
    },
    methods: {
        async fetchReviews() {
            const response = await fetch("http://localhost:3000/api/site-reviews");
            if (response.ok) {
                this.reviews = await response.json();
            } else {
                alert("Errore durante il recupero delle recensioni.");
            }
        },
        setRating(star) {
            this.newReview.rating = star;
        },
        hoverRating(star) {
            this.hoverRatingValue = star;
        },
        async submitReview() {
            if (!this.newReview.rating) {
                alert("Seleziona una valutazione con le stelle.");
                return;
            }
  
            const response = await fetch("http://localhost:3000/api/site-reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.newReview),
            });
  
            if (response.ok) {
                alert("Recensione inviata con successo!");
                this.newReview = { username: "", rating: null, comment: "" };
                this.fetchReviews(); // Aggiorna la lista delle recensioni
            } else {
                alert("Errore durante l'invio della recensione.");
            }
        },
    },
  };
   
  const CreaPanino = {
    template: `
    <div class="container mt-4">
        <!-- Sezione immagini centrali -->
        <div class="text-center mb-4 d-flex justify-content-center align-items-center flex-wrap">
            <img 
                src="./immagini/creailtuopanino.png" 
                alt="Crea il tuo Panino" 
                class="img-fluid rounded shadow mx-3"
                style="max-width: 100%; height: 400px;"
            />
            <img 
                src="./immagini/paninoscomposto.png" 
                alt="Panino Extra" 
                class="img-fluid rounded shadow mx-3"
                style="max-width: 100%; height: 400px;"
            />
        </div>
  
        <p class="text-muted text-center mt-3">Personalizza il tuo panino con gli ingredienti che preferisci e rendilo unico! 🎉</p>
        <p class="text-danger text-center font-weight-bold">Il miglior panino creato da voi verrà selezionato e presto aggiunto al nostro menù! 🍔🔥</p>
  
        <!-- Form per la creazione del panino -->
        <form @submit.prevent="submitBurger" class="shadow p-4 rounded bg-light">
            <!-- Nome del panino -->
            <div class="form-group">
                <label for="burger_name" class="font-weight-bold">Nome del Panino</label>
                <input 
                    type="text" 
                    id="burger_name" 
                    v-model="burger_name" 
                    class="form-control" 
                    placeholder="Inserisci un nome creativo per il tuo panino" 
                    required
                />
            </div>
  
            <!-- Selezione degli ingredienti -->
            <div class="form-group">
                <label class="font-weight-bold">Seleziona gli ingredienti:</label>
                <div class="d-flex flex-wrap">
                    <div 
                        v-for="ingredient in availableIngredients" 
                        :key="ingredient" 
                        class="form-check mx-2 my-2"
                    >
                        <input 
                            type="checkbox" 
                            class="form-check-input" 
                            :id="ingredient" 
                            :value="ingredient" 
                            v-model="selectedIngredients"
                        />
                        <label class="form-check-label" :for="ingredient">
                            {{ ingredient }}
                        </label>
                    </div>
                </div>
            </div>
  
            <!-- Aggiunta di un ingrediente personalizzato -->
            <div class="form-group">
                <label for="custom_ingredient" class="font-weight-bold">Aggiungi un ingrediente personalizzato:</label>
                <div class="d-flex">
                    <input 
                        type="text" 
                        id="custom_ingredient" 
                        v-model="customIngredient" 
                        class="form-control mr-2" 
                        placeholder="Inserisci un ingrediente"
                    />
                    <button 
                        type="button" 
                        @click="addCustomIngredient" 
                        class="btn btn-primary"
                    >
                        Aggiungi
                    </button>
                </div>
                <p v-if="customIngredientError" class="text-danger mt-2">{{ customIngredientError }}</p>
            </div>
  
            <!-- Anteprima del panino -->
            <div class="text-center mt-3">
                <h4 class="text-success">Anteprima del tuo Panino:</h4>
                <div class="burger-preview p-3 border rounded bg-white shadow-sm">
                    <p v-if="burger_name" class="font-weight-bold text-uppercase">{{ burger_name }}</p>
                    <p v-if="selectedIngredients.length">Ingredienti: {{ selectedIngredients.join(', ') }}</p>
                    <p v-else class="text-muted">Nessun ingrediente selezionato</p>
                </div>
            </div>
  
            <!-- Bottone per inviare il panino -->
            <button type="submit" class="btn btn-success btn-block mt-4">
                Invia il Panino 🚀
            </button>
        </form>
  
    `,
    data() {
      return {
        burger_name: "",
        selectedIngredients: [],
        customIngredient: "",
        customIngredientError: "",
        availableIngredients: [
          "Pane 🫓",
          "Hamburger di manzo 🥩",
          "Pollo 🍗",
          "Insalata 🥬",
          "Pomodoro 🍅",
          "Cipolla 🧅",
          "Cheddar 🧀",
          "Bacon 🥓",
          "Ketchup 🔴",
          "Salsa speciale 🌶️"
        ],
      };
    },
    methods: {
      async submitBurger() {
        if (!this.burger_name || this.selectedIngredients.length === 0) {
          alert("Inserisci un nome per il panino e scegli almeno un ingrediente!");
          return;
        }
        try {
          const user = JSON.parse(localStorage.getItem("user")) || {};
          const username = user.username || "Anonimo";
  
          const response = await fetch("http://localhost:3000/api/custom-burgers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              burger_name: this.burger_name,
              ingredients: this.selectedIngredients
            })
          });
  
          if (response.ok) {
            alert("Il tuo panino è stato inviato con successo! 🍔");
            this.burger_name = "";
            this.selectedIngredients = [];
            this.customIngredient = "";
            this.$router.push("/");
          } else {
            const error = await response.text();
            alert(`Errore: ${error}`);
          }
        } catch (error) {
          console.error("Errore durante l'invio del panino:", error);
          alert("Errore durante l'invio del panino. Riprova più tardi.");
        }
      },
      addCustomIngredient() {
        if (!this.customIngredient.trim()) {
          this.customIngredientError = "Inserisci un ingrediente valido!";
          return;
        }
        if (this.availableIngredients.includes(this.customIngredient) || this.selectedIngredients.includes(this.customIngredient)) {
          this.customIngredientError = "Questo ingrediente è già presente!";
          return;
        }
        this.selectedIngredients.push(this.customIngredient);
        this.customIngredient = "";
        this.customIngredientError = "";
      },
    }
  };
  
  
  const ClassificaPanini = {
    template: `
    <div class="container mt-4">
        <!-- Titolo semplice e chiaro -->
        <h4 class="text-center text-dark mb-4 font-weight-bold">
          Classifica Panini 🍔
        </h4>
        <p class="text-center text-muted">Vota il tuo panino preferito!</p>
  
        <!-- Tabella dei panini -->
        <table class="table table-hover table-bordered text-center">
            <thead class="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Immagine</th>
                    <th>Nome del Panino</th>
                    <th>Descrizione</th>
                    <th>Voti</th>
                    <th>Vota</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(burger, index) in sortedBurgers" :key="burger.id">
                    <!-- Posizione in classifica -->
                    <td class="align-middle font-weight-bold">{{ index + 1 }}</td>
  
                    <!-- Immagine -->
                    <td class="align-middle">
                        <img :src="burger.image" class="img-fluid rounded" alt="Panino"
                            style="width: 80px; height: 80px;">
                    </td>
  
                    <!-- Nome del panino -->
                    <td class="align-middle font-weight-bold text-uppercase">{{ burger.name }}</td>
  
                    <!-- Descrizione -->
                    <td class="align-middle text-muted">{{ burger.description }}</td>
  
                    <!-- Numero di voti -->
                    <td class="align-middle font-weight-bold text-primary">{{ burger.total_votes }}</td>
  
                    <!-- Bottone per votare -->
                    <td class="align-middle">
                        <button 
                            :disabled="hasVoted" 
                            @click="voteBurger(burger.id)" 
                            class="btn btn-primary btn-sm"
                        >
                            {{ hasVoted ? "Votato 👍" : "Vota ⭐" }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
  
        <!-- Messaggio se non ci sono panini -->
        <p v-if="burgers.length === 0" class="text-center text-muted mt-4">
          Nessun panino disponibile. Creane uno ora! 🚀
        </p>
    </div>
    `,
    data() {
      return {
        burgers: [],  
        hasVoted: false,  
      };
    },
    computed: {
      // Ordina i panini per numero di voti
      sortedBurgers() {
        return [...this.burgers].sort((a, b) => b.total_votes - a.total_votes);
      }
    },
    mounted() {
      this.fetchBurgers();  // Carica la classifica dei panini
      this.checkVoteStatus(); // Verifica se l'utente ha già votato
    },
    methods: {
 
      async fetchBurgers() {
        try {
          const response = await fetch("http://localhost:3000/api/burgers/votes");
          if (response.ok) {
            this.burgers = await response.json();
          } else {
            console.error("Errore nel recupero dei panini:", await response.text());
          }
        } catch (error) {
          console.error("Errore nella connessione al server:", error);
        }
      },
  
      // Verifica se l'utente ha già votato basandosi sull'username
      checkVoteStatus() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && localStorage.getItem(`votedBurger_${user.username}`)) {
          this.hasVoted = true;
        }
      },
  
      
      async voteBurger(burgerId) {
        try {
          const response = await fetch(`http://localhost:3000/api/burgers/${burgerId}/vote`, {
            method: "POST"
          });
  
          if (response.ok) {
            // Incrementa i voti localmente per aggiornare subito l'interfaccia
            const burger = this.burgers.find(b => b.id === burgerId);
            if (burger) {
              burger.total_votes += 1;
  
              // Ottieni l'utente attuale
              const user = JSON.parse(localStorage.getItem("user"));
              if (user) {
                // Salva il fatto che questo utente ha votato
                localStorage.setItem(`votedBurger_${user.username}`, burgerId);
                this.hasVoted = true;
              }
  
              alert(`Hai votato per "${burger.name}"! 🍔`);
            }
          } else {
            alert("Errore durante il voto. Riprova più tardi.");
          }
        } catch (error) {
          console.error("Errore durante il voto:", error);
          alert("Errore durante il voto. Riprova più tardi.");
        }
      }
    }
  };
  
  
  
  const routes = [
    { path: "/Login", component: Login },
    { path: "/Register", component: Register },
    { path: '/', component: Home },
    { path: '/Compra', component: Compra },
    { path: "/ConfermaOrdine", component: ConfermaOrdine },
    { path: '/Scopri', component: Scopri },
    { path: "/Recensioni", component: SiteReviews },
    { path: "/ClassificaPanini", component: ClassificaPanini },
    { path: "/CreaPanino", component: CreaPanino }
  ];
  
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  });
  
  
  const app = Vue.createApp({});
  app.use(router);
  app.mount('#vueApp');