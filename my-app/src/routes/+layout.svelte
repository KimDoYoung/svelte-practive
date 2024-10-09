<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "../styles/global.css";
</script>
<header></header>
<div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-warning">
        <div class="container-fluid">
          <a class="navbar-brand" href="#none">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/diary">diary</a>
              </li>
            </ul>
          </div>
        </div>
    </nav>    
    <slot></slot>
</div>
<footer class="container">
    copy right 2024 by sveltekit
</footer>