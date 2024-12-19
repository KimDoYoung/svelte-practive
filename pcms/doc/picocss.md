# picco css

[picco 문서](https://picocss.com/docs)

## 버튼

- button.secondary, button.outline, button.contrast
- disabled

```html
<button class="outline">Primary</button>
<button class="outline secondary">Secondary</button>
<button class="outline contrast">Contrast</button>
<input type="submit">
<input type="button" value="Input">
<input type="reset">
<button disabled>Disabled</button>
<button class="secondary" disabled>Disabled</button>
<button class="contrast" disabled>Disabled</button>
<div role="button" tabindex="0">Div as a button</div>
<div role="group">
  <button>Button</button>
  <button>Button</button>
  <button>Button</button>
</div>
```

## typography

```html
<hgroup>
  <h2>Get inspired with CSS</h2>
  <p>How to use CSS to add glam to your Website?</p>
</hgroup>
<blockquote>
  “Design is a funny word. Some people think 
  <footer>
    <cite>— Steve Jobs</cite>
  </footer>
</blockquote>
```

## table

```html
<table class="striped">
  <thead>
    <tr>
      <th scope="col">Planet</th>
      <th scope="col">Diameter (km)</th>
      <th scope="col">Distance to Sun (AU)</th>
      <th scope="col">Orbit (days)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Mercury</th>
      <td>4,880</td>
      <td>0.39</td>
      <td>88</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Average</th>
      <td>9,126</td>
      <td>0.91</td>
      <td>341</td>
    </tr>
  </tfoot>
</table>
```

## form

- form basic

```html
<form>
  <fieldset>
    <label>
      First name
      <input
        name="first_name"
        placeholder="First name"
        autocomplete="given-name"
      />
    </label>
    <label>
      Email
      <input
        type="email"
        name="email"
        placeholder="Email"
        autocomplete="email"
      />
    </label>
  </fieldset>

  <input
    type="submit"
    value="Subscribe"
  />
</form>
```

- form 가로배열

```html
<form>
  <fieldset class="grid">
    <input 
      name="login"
      placeholder="Login"
      aria-label="Login"
      autocomplete="username"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      aria-label="Password"
      autocomplete="current-password"
    />
    <input
      type="submit"
      value="Log in"
    />
  </fieldset>
</form>
```

- form group

```html
<form>
  <fieldset role="group">
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      autocomplete="email"
    />
    <input type="submit" value="Subscribe" />
  </fieldset>
</form>
```

## input

- basic

```html
<input type="text" name="text" placeholder="Text" aria-label="Text">
<input type="email" name="email" placeholder="Email" aria-label="Email" autocomplete="email">
<input type="number" name="number" placeholder="Number" aria-label="Number">
<input type="password" name="password" placeholder="Password" aria-label="Password">
<input type="tel" name="tel" placeholder="Tel" aria-label="Tel" autocomplete="tel">
<input type="url" name="url" placeholder="Url" aria-label="Url">
```

- datetime

```html
<input type="date" name="date" aria-label="Date">
<input type="datetime-local" name="datetime-local" aria-label="Datetime local">
<input type="month" name="month" aria-label="Month">
<input type="time" name="time" aria-label="Time">
```

- search

```html
<input
  type="search"
  name="search"
  placeholder="Search"
  aria-label="Search"
/>
```

- color

```html
<input
  type="color"
  value="#ff9500"
  aria-label="Color picker"
>
```

- file

```html
<input type="file">
```

- disable/readonly

```html
<input
  type="text"
  name="text"
  placeholder="Disabled"
  aria-label="Disabled input"
  disabled
>
<input
  type="text"
  name="text"
  value="Read-only"
  aria-label="Read-only input"
  readonly
>
```  

- validation

```html
<input
  type="text"
  name="valid"
  value="Valid"
  aria-invalid="false"
  aria-describedby="valid-helper"
>
<small id="valid-helper">Looks good!</small>

<input
  type="text"
  name="invalid"
  value="Invalid"
  aria-invalid="true"
  aria-describedby="invalid-helper"
>
<small id="invalid-helper">
  Please provide a valid value!
</small>
```

## textarea

```html
<textarea
  name="bio"
  placeholder="Write a professional short bio..."
  aria-label="Professional short bio"
>
</textarea>
<textarea name="disabled" disabled>
<textarea name="read-only" readonly>
<textarea name="valid" aria-invalid="false">
<textarea
  name="valid"
  aria-invalid="false"
  aria-describedby="valid-helper"
>
  Valid
</textarea>
<small id="valid-helper">Looks good!</small  
```

## select

```html
<select name="favorite-cuisine" aria-label="Select your favorite cuisine..." required>
  <option selected disabled value="">
    Select your favorite cuisine...
  </option>
  <option>Italian</option>
  <option>Japanese</option>
  <option>Indian</option>
  <option>Thai</option>
  <option>French</option>
</select>
```

## dropdown

```html
    const closeDropdown = () => {
        const dropdown = document.getElementById("movie-drop-down");
        if (dropdown) {
            dropdown.removeAttribute("open");
        }
    }

<details class="dropdown" role="list" id="movie-drop-down">
  <summary>Dropdown</summary>
  <ul>
    <li><a href="#" onclick={closeDropdown}>Solid</a></li>
    <li><a href="#" onclick={closeDropdown}>Liquid</a></li>
    <li><a href="#" onclick={closeDropdown}>Gas</a></li>
    <li><a href="#" onclick={closeDropdown}>Plasma</a></li>
  </ul>
</details>
```

## checkbox

- vertical

```html
<fieldset>
  <legend>Language preferences:</legend>
  <label>
    <input type="checkbox" name="english" checked />
    English
  </label>
  <label aria-disabled="true">
    <input type="checkbox" name="dothraki" disabled />
    Dothraki
  </label>
</fieldset>
```

- horizontal

```html
<fieldset>
  <legend>Language preferences:</legend>
  <input type="checkbox" id="hindi" name="hindi" checked />
  <label htmlFor="hindi">Hindi</label>
  <input type="checkbox" id="swahili" name="swahili" />
  <label htmlFor="swahili">Swahili</label>
  <input type="checkbox" id="navi" name="navi" disabled />
  <label htmlFor="navi" aria-disabled="true">Na'vi</label>
</fieldset>
```

## radio

-vertical

```html
<fieldset>
  <legend>Language preference:</legend>
  <label>
    <input type="radio" name="language" checked />
    English
  </label>
  <label aria-disabled="true">
    <input type="radio" name="language" disabled />
    Dothraki
  </label>
</fieldset>
```

-horizontal

```html
<fieldset>
  <legend>Second language:</legend>
  <input type="radio" id="hindi" name="second-language" checked />
  <label htmlFor="hindi">Hindi</label>
  <input type="radio" id="swahili" name="second-language" />
  <label htmlFor="swahili">Swahili</label>
  <input type="radio" id="navi" name="second-language" disabled />
  <label htmlFor="navi" aria-disabled="true">Na'vi</label>
</fieldset>
```

## switch

```html
<fieldset>
  <label>
    <input name="terms" type="checkbox" role="switch" />
    I agree to the Terms
  </label>
  <label>
    <input name="opt-in" type="checkbox" role="switch" checked />
    Receive news and offers
  </label>
</fieldset>
```

## range

```html
<label>
  Contrast
  <input type="range" value="40" />
</label>
```

## accordion

```html
<details open>
  <summary>Accordion 1</summary>
  <p>...</p>
</details>

<hr />

<details>
  <summary>Accordion 2</summary>
  <ul>
    <li>...</li>
    <li>...</li>
  </ul>
</details>
```

## card

```html
<!-- artical is card -->
<article>I’m a card!</article>
<article>
  <header>Header</header>
  Body
  <footer>Footer</footer>
</article>
```
