'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tfg-congelador documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' : 'data-bs-target="#xs-components-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' :
                                            'id="xs-components-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' }>
                                            <li class="link">
                                                <a href="components/AddProductosAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddProductosAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CabeceraComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CabeceraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CajonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CajonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CajonItemAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CajonItemAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CajonItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CajonItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FamiliaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FamiliaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioSesionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InicioSesionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeveraComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NeveraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeveraItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NeveraItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeverasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NeverasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductoCajonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductoCajonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductoItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductoItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductosFamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductosFamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PruebasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SesionRegistroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SesionRegistroComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' : 'data-bs-target="#xs-directives-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' :
                                        'id="xs-directives-links-module-AppModule-f5e680cf4ab65046a27b9544113408106f62c72a60bbd7df8e15f6b89d48334275eb1cef543755573e6969e2c2c6b87534cacd1d2d23c2d5c94cce690b99d1ac"' }>
                                        <li class="link">
                                            <a href="directives/NumerosdecimalesDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumerosdecimalesDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Cajon.html" data-type="entity-link" >Cajon</a>
                            </li>
                            <li class="link">
                                <a href="classes/Familia.html" data-type="entity-link" >Familia</a>
                            </li>
                            <li class="link">
                                <a href="classes/Nevera.html" data-type="entity-link" >Nevera</a>
                            </li>
                            <li class="link">
                                <a href="classes/Producto.html" data-type="entity-link" >Producto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductoAdmin.html" data-type="entity-link" >ProductoAdmin</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductoFamilia.html" data-type="entity-link" >ProductoFamilia</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirestoreService.html" data-type="entity-link" >FirestoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgbDateCustomParserFormatter.html" data-type="entity-link" >NgbDateCustomParserFormatter</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});