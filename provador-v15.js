(function () {
    const apiKey = "pl_live_156c5985bf6dbfa6929007420af9a9792d72d11ad239533663d0255a6a7ecd96";
    window.PROVOU_LEVOU_API_KEY = apiKey;

    const WEBHOOK_CALCADOS = 'https://n8n.segredosdodrop.com/webhook/quantic-materialize-carminito';
    const WEBHOOK_SUETER = 'https://n8n.segredosdodrop.com/webhook/quantic-materialize';

    function detectWebhook() {
        // Detecta categoria via Shopify product JSON, breadcrumb ou URL
        const productJson = document.querySelector('script[type="application/json"][data-product-json]');
        let productType = '';
        if (productJson) {
            try { productType = JSON.parse(productJson.textContent).type || ''; } catch(_) {}
        }
        // Fallback: checa breadcrumb e meta tags
        const breadcrumb = document.querySelector('.breadcrumb, .breadcrumbs, nav[aria-label="breadcrumb"]')?.textContent || '';
        const pageText = (productType + ' ' + breadcrumb + ' ' + document.title + ' ' + (document.querySelector('meta[property="og:type"]')?.content || '')).toLowerCase();

        if (/su[eé]ter|sweater|sueteres|moletom/.test(pageText)) return WEBHOOK_SUETER;
        // Shopify coloca o tipo do produto no meta ou no JSON — checa collection na URL tambem
        if (window.location.href.toLowerCase().includes('sueteres') || window.location.href.toLowerCase().includes('sweater')) return WEBHOOK_SUETER;
        return WEBHOOK_CALCADOS;
    }


    // ─── LOCK / UNLOCK SCROLL ────────────────────────────────────────────────────


    let scrollY = 0;


    function lockBodyScroll() {
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflowY = 'scroll';
    }


    function unlockBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollY);
    }


    // ─── ESTILOS ──────────────────────────────────────────────────────────────────


    const styles = `
        :root {
            --q-primary: #000000; --q-bg: #ffffff;
            --q-border: #000000; --q-gray: #f5f5f5;
            --q-text: #000000; --q-text-light: #666666;
        }

        @keyframes q-shake {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(-10deg); }
            20% { transform: rotate(10deg); }
            30% { transform: rotate(-10deg); }
            40% { transform: rotate(10deg); }
            50% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
        }
        .q-btn-trigger-ia {
            position: absolute; top: 15px; right: 15px; z-index: 100;
            background: transparent !important; border: none; padding: 0; cursor: pointer;
            width: 70px; height: 70px; display: flex; align-items: center; justify-content: center;
            transition: transform 0.2s ease;
            animation: q-shake 3s infinite;
            pointer-events: auto;
        }
        .q-btn-trigger-ia:hover {
            animation-play-state: paused; transform: scale(1.1) !important;
        }

        #q-modal-ia { display: none; position: fixed; inset: 0; background: rgba(255,255,255,0.98); z-index: 999999; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; }
        .q-card-ia { background: var(--q-bg); width: 100%; max-width: 480px; padding: 0; position: relative; color: var(--q-text); border: 1px solid var(--q-border); max-height: 94vh; display: flex; flex-direction: column; overflow: hidden; }
        .q-content-scroll { padding: 40px 30px; overflow-y: auto; flex: 1; text-align: center; }
        .q-close-ia { position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--q-text); cursor: pointer; font-size: 24px; z-index: 100; font-weight: 300; }
        .q-tips-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px 0; margin: 20px 0; border-top: 1px solid var(--q-gray); border-bottom: 1px solid var(--q-gray); }
        .q-tip-item { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 9px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--q-text-light); }
        .q-tip-item i { color: var(--q-primary); font-size: 20px; }
        .q-lead-form { margin: 30px 0 20px; display: flex; flex-direction: column; gap: 20px; text-align: left; }
        .q-group { flex: 1; }
        .q-group label { display: block; font-size: 9px; font-weight: 600; letter-spacing: 1.5px; color: var(--q-text); margin-bottom: 8px; text-transform: uppercase; }
        .q-input { width: 100%; padding: 22px 18px; border: 1px solid var(--q-border); font-size: 16px !important; font-family: 'Inter', sans-serif; background: transparent; color: var(--q-text); outline: none; box-sizing: border-box; -webkit-text-size-adjust: 100%; }
        .q-input:focus { border-width: 2px; padding: 14px; font-size: 16px !important; }
        .q-btn-black { background: var(--q-primary); color: var(--q-bg); border: 1px solid var(--q-primary); width: 100%; padding: 18px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; margin-top: 20px; transition: 0.3s; }
        .q-btn-black:disabled { background: var(--q-gray); color: #999; border-color: var(--q-gray); cursor: not-allowed; }
        .q-btn-black:not(:disabled):hover { background: var(--q-bg); color: var(--q-primary); }
        .q-btn-buy { background: var(--q-primary); color: var(--q-bg); border: 1px solid var(--q-primary); width: 100%; padding: 20px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; margin-bottom: 15px; transition: 0.3s; }
        .q-btn-buy:hover { background: var(--q-bg); color: var(--q-primary); }
        .q-btn-outline { background: var(--q-bg); color: var(--q-primary); border: 1px solid var(--q-border); width: 100%; padding: 18px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
        .q-btn-outline:hover { background: var(--q-primary); color: var(--q-bg); }
        .q-powered-footer { background: var(--q-bg); padding: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; flex-shrink: 0; border-top: 1px solid var(--q-gray); }
        .q-quantic-logo { height: 24px; filter: brightness(0); }
        .q-status-msg { display:none; font-size: 9px; letter-spacing: 1px; color: #ef4444; margin-top: 8px; font-weight: 600; text-align: left; text-transform: uppercase; }

        /* SELETOR DE IMAGEM DO PRODUTO */
        .q-product-picker-label { font-size: 9px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--q-text); margin-bottom: 10px; text-align: center; }
        .q-product-picker { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
        .q-product-thumb {
            width: 64px; height: 64px; border: 1px solid var(--q-gray); cursor: pointer;
            overflow: hidden; transition: 0.2s; opacity: 0.5; flex-shrink: 0;
        }
        .q-product-thumb:hover { opacity: 0.8; }
        .q-product-thumb.selected { border: 2px solid var(--q-primary); opacity: 1; }
        .q-product-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .q-content-scroll::-webkit-scrollbar { width: 4px; }
        .q-content-scroll::-webkit-scrollbar-thumb { background: #e5e5e5; }

        /* BOTAO INLINE ACIMA DO CARRINHO */
        .q-inline-wrapper {
            position: relative !important; width: 100% !important; margin-bottom: 10px !important;
        }
        .q-btn-inline-provador {
            display: flex !important; align-items: center !important; justify-content: center !important;
            gap: 10px !important; width: 100% !important; padding: 12px 20px !important;
            background: var(--q-bg) !important; color: var(--q-primary) !important;
            border: 1px solid var(--q-primary) !important;
            font-family: 'Inter', sans-serif !important; font-size: 11px !important;
            font-weight: 600 !important; text-transform: uppercase !important;
            letter-spacing: 2px !important; cursor: pointer !important;
            transition: all 0.3s ease !important; text-decoration: none !important;
            box-sizing: border-box !important;
        }
        .q-btn-inline-provador:hover {
            background: var(--q-primary) !important; color: var(--q-bg) !important;
        }
        @keyframes q-float-badge { 0%, 100% { transform: translateY(0) rotate(2deg); } 50% { transform: translateY(-5px) rotate(-1deg); } }
        .q-badge-novidade {
            position: absolute; top: -14px; right: 10px; background: #000; color: #fff;
            padding: 4px 12px; border-radius: 20px; font-size: 9px; font-weight: 800;
            text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; z-index: 2;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15); font-family: 'Inter', sans-serif;
            animation: q-float-badge 3s ease-in-out infinite;
        }
        @keyframes q-slide { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes q-pulse-text { 0%, 100% { opacity: 0.4; transform: scale(0.98); } 50% { opacity: 1; transform: scale(1); } }

        #q-step-confirm {
            position: absolute; inset: 0; background: rgba(0,0,0,0.5);
            backdrop-filter: blur(2px); z-index: 200; display: none;
            align-items: center; justify-content: center; padding: 20px;
        }
        .q-confirm-box {
            background: #ffffff; width: 100%; max-width: 380px; padding: 40px 30px;
            border: 1px solid #000; text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            animation: q-popup-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes q-popup-zoom { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        @media (min-width: 768px) {
            .q-card-ia.is-result {
                width: 820px !important; max-width: 90vw !important;
                height: 560px !important;
            }
            .q-card-ia.is-result #q-header-provador,
            .q-card-ia.is-result .q-powered-footer { display: none !important; }
            .q-card-ia.is-result .q-content-scroll {
                padding: 0 !important; height: 100% !important;
                overflow: hidden !important; display: flex !important; flex-direction: column !important;
            }
            .q-card-ia.is-result #q-step-result {
                display: flex !important; flex-direction: row !important;
                width: 100%; height: 100%; align-items: stretch;
            }
            .q-card-ia.is-result #q-result-img-col {
                width: 50% !important; height: 100% !important; margin: 0 !important;
                border: none !important; border-right: 1px solid var(--q-border) !important;
                position: relative !important; flex-shrink: 0;
            }
            .q-card-ia.is-result #q-result-img-col img {
                position: absolute !important; top: 0; left: 0;
                width: 100% !important; height: 100% !important;
                object-fit: contain !important; object-position: center center !important;
            }
            .q-card-ia.is-result #q-result-actions-col {
                width: 50% !important; height: 100% !important; padding: 40px !important;
                display: flex !important; flex-direction: column; justify-content: center;
                box-sizing: border-box; overflow-y: auto;
            }
            .q-card-ia.is-result .q-res-title { display: block !important; font-size: 20px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--q-text); margin-bottom: 4px; }
            .q-card-ia.is-result .q-res-subtitle { display: block !important; font-size: 11px; color: var(--q-text-light); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 30px; }
            .q-card-ia.is-result .q-btn-buy,
            .q-card-ia.is-result .q-btn-outline {
                display: flex; align-items: center; justify-content: center; gap: 8px;
                font-size: 11px !important; padding: 18px !important;
                font-weight: 600; letter-spacing: 2px !important; text-transform: uppercase !important;
            }
            .q-card-ia.is-result .q-btn-buy { margin-bottom: 12px; }
            .q-card-ia.is-result .q-res-mobile-only { display: none !important; }
            .q-card-ia.is-result .q-close-ia { top: 16px; right: 16px; color: var(--q-text); z-index: 10; }
        }
    `;


    const stampImageHTML = `<img src="https://cdn.shopify.com/s/files/1/0636/6334/1746/files/logo_provador.png?v=1772494793" alt="Provador Virtual" style="width:100%;height:100%;object-fit:contain;">`;


    const html = `
        <div id="q-modal-ia">
            <div class="q-card-ia">
                <button type="button" class="q-close-ia" id="q-close-btn">&times;</button>
                <div class="q-content-scroll">
                    <div id="q-header-provador">
                        <h1 style="margin:0 0 10px 0;font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Provador Virtual</h1>
                        <div style="margin:0;text-align:center;">
                            <img src="https://carminito.com/cdn/shop/files/C_A_R_M_I_N_I_T_O_8485d63c-f949-4d30-800d-0b2a7f67e871.png?v=1774712404&width=280" alt="CARMINITO" style="height:32px;width:auto;display:inline-block;">
                        </div>
                    </div>
                    <div id="q-step-upload">
                        <p class="q-product-picker-label">Selecione a foto do produto</p>
                        <div class="q-product-picker" id="q-product-picker"></div>
                        <div class="q-lead-form">
                            <div class="q-group">
                                <label>Seu Celular</label>
                                <input type="tel" id="q-phone" class="q-input" placeholder="(11) 99999-9999" maxlength="15">
                                <div id="q-phone-error" class="q-status-msg">Insira um numero valido</div>
                            </div>
                        </div>
                        <p style="margin:10px 0 10px;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--q-text-light);text-align:center;">Sua foto deve seguir estes requisitos:</p>
                        <div class="q-tips-grid" style="margin-top:0;">
                            <div class="q-tip-item"><i class="ph ph-t-shirt"></i><span>Com Roupa</span></div>
                            <div class="q-tip-item"><i class="ph ph-person"></i><span>Corpo Inteiro</span></div>
                            <div class="q-tip-item"><i class="ph ph-sun"></i><span>Boa Luz</span></div>
                        </div>
                        <div style="display:flex;gap:20px;justify-content:center;margin-top:30px;">
                            <div id="q-trigger-upload" style="width:120px;height:160px;border:1px solid var(--q-border);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:var(--q-gray);transition:0.3s;">
                                <i class="ph ph-camera-plus" style="font-size:32px;color:var(--q-primary);margin-bottom:10px;"></i>
                                <span style="font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Enviar Foto</span>
                                <input type="file" id="q-real-input" accept="image/*" style="display:none">
                            </div>
                            <div id="q-pre-view" style="display:none;width:120px;height:160px;overflow:hidden;border:1px solid var(--q-border);">
                                <img id="q-pre-img" style="width:100%;height:100%;object-fit:cover;">
                            </div>
                        </div>
                        <label style="display:flex;align-items:flex-start;gap:8px;margin-top:16px;cursor:pointer;font-size:12px;line-height:1.4;color:#64748b;justify-content:center;text-align:center;">
                            <input type="checkbox" id="q-accept-terms" style="margin-top:2px;cursor:pointer;accent-color:#000;">
                            Ao continuar, concordo com os <a href="http://provoulevou.com.br/termos.html" target="_blank" style="color:#000;text-decoration:underline;">Termos e Condicoes</a>
                        </label>
                        <button class="q-btn-black" id="q-btn-generate" disabled>Ver no meu corpo</button>
                    </div>

                    <div id="q-step-confirm" style="display:none;pointer-events:none;">
                        <div class="q-confirm-box">
                            <h2 style="margin:0 0 30px 0;font-size:16px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#000;line-height:1.4;">Sua foto segue estes requisitos?</h2>
                            <div class="q-tips-grid" style="margin-bottom:35px;border-top:none;border-bottom:none;padding:0;">
                                <div class="q-tip-item"><i class="ph ph-t-shirt" style="font-size:24px;"></i><span style="font-size:8px;">Com Roupa</span></div>
                                <div class="q-tip-item"><i class="ph ph-person" style="font-size:24px;"></i><span style="font-size:8px;">Corpo Inteiro</span></div>
                                <div class="q-tip-item"><i class="ph ph-sun" style="font-size:24px;"></i><span style="font-size:8px;">Boa Luz</span></div>
                            </div>
                            <button class="q-btn-black" id="q-btn-confirm-yes" style="margin-top:0;padding:20px 0;">SIM, GERAR FOTO</button>
                            <button class="q-btn-outline" id="q-btn-confirm-no" style="margin-top:15px;border-color:#ef4444;color:#ef4444;padding:18px 0;background:none;">NAO, QUERO TROCAR</button>
                        </div>
                    </div>

                    <div style="display:none;padding:60px 0;text-align:center;" id="q-loading-box">
                        <div style="font-weight:600;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;animation:q-pulse-text 1.5s infinite ease-in-out;">Gerando Prova Virtual...</div>
                        <div style="height:1px;background:var(--q-gray);width:100%;position:relative;overflow:hidden;">
                            <div style="position:absolute;top:0;left:0;height:100%;width:30%;background:var(--q-primary);animation:q-slide 1.5s infinite linear;"></div>
                        </div>
                    </div>

                    <div id="q-step-result" style="display:none;flex-direction:column;align-items:center;">
                        <div id="q-result-img-col" style="width:100%;border:1px solid var(--q-border);margin-bottom:30px;background:var(--q-gray);">
                            <img id="q-final-view-img" style="width:100%;height:auto;display:block;">
                        </div>
                        <div id="q-result-actions-col" style="width:100%;">
                            <span class="q-res-title" style="display:none;">Provador Virtual</span>
                            <span class="q-res-subtitle" style="display:none;">Visualize como a peca fica em voce</span>
                            <!-- BOTAO CARRINHO DESATIVADO TEMPORARIAMENTE
                            <button class="q-btn-buy" id="q-add-to-cart-btn">
                                <i class="ph ph-shopping-cart"></i>
                                Adicionar ao Carrinho
                            </button>
                            -->
                            <button class="q-btn-buy" id="q-btn-back">Voltar ao Produto</button>
                            <p class="q-res-mobile-only" style="margin-top:30px;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--q-text-light);cursor:pointer;text-decoration:underline;text-underline-offset:4px;" id="q-retry-btn">Tentar outra foto</p>
                        </div>
                    </div>
                </div>
                <a href="https://provoulevou.com.br" target="_blank" class="q-powered-footer" style="text-decoration:none;">
                    <span style="font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--q-text-light);">Powered by</span>
                    <img src="https://provoulevou.com.br/assets/provoulevou-logo.png" class="q-quantic-logo">
                </a>
            </div>
        </div>
    `;


    function init() {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        if (!window.phosphorIconsLoaded) {
            const ph = document.createElement('script');
            ph.src = 'https://unpkg.com/@phosphor-icons/web';
            document.head.appendChild(ph);
            window.phosphorIconsLoaded = true;
        }

        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);

        const modalContainer = document.createElement('div');
        modalContainer.insertAdjacentHTML('afterbegin', html);
        document.body.appendChild(modalContainer);

        const openBtn = document.createElement('button');
        openBtn.className = 'q-btn-trigger-ia';
        openBtn.id = 'q-open-ia';
        openBtn.setAttribute('aria-label', 'Abrir Provador Virtual');
        openBtn.insertAdjacentHTML('afterbegin', stampImageHTML);

        const imgContainers = ['.product__media-wrapper', '.product-gallery__media', '.product__media', '.product-image-main', '.product-media-container', '[data-media-id]', '.product__media-item', '.product-gallery', '.product-single__media', '.media-gallery'];
        let placed = false;
        for (const sel of imgContainers) {
            const el = document.querySelector(sel);
            if (el) {
                if (window.getComputedStyle(el).position === 'static') el.style.position = 'relative';
                el.appendChild(openBtn);
                placed = true; break;
            }
        }
        if (!placed) {
            openBtn.style.cssText = 'position:fixed;bottom:30px;right:20px;top:auto;width:70px;height:70px;';
            document.body.appendChild(openBtn);
        }

        // ── Botao inline acima do botao de compra ──
        const inlineWrapper = document.createElement('div');
        inlineWrapper.className = 'q-inline-wrapper';
        inlineWrapper.insertAdjacentHTML('afterbegin', '<div class="q-badge-novidade">Novidade!</div><button type="button" class="q-btn-inline-provador">PROVADOR VIRTUAL</button>');
        const inlineBtn = inlineWrapper.querySelector('.q-btn-inline-provador');

        const buyBtnSelectors = [
            'button[name="add"]', 'button.product-form__submit',
            '.btn-add-to-cart', '[data-action="add-to-cart"]',
            'button[data-btn-addtocart]', '.product-form button[type="submit"]',
            'form[action*="/cart/add"] button[type="submit"]',
            '#AddToCart', '.add-to-cart', '.shopify-payment-button',
            '.product-form__buttons', '.product-form__cart-submit',
        ];
        let inlinePlaced = false;
        for (const sel of buyBtnSelectors) {
            const buyEl = document.querySelector(sel);
            if (buyEl) {
                const target = buyEl.closest('.product-form__buttons') || buyEl.parentElement;
                target.insertBefore(inlineWrapper, target.firstChild);
                inlinePlaced = true;
                break;
            }
        }
        if (!inlinePlaced) {
            // Fallback: coloca antes do primeiro form submit encontrado
            const anySubmit = document.querySelector('form button[type="submit"]');
            if (anySubmit) anySubmit.parentElement.insertBefore(inlineWrapper, anySubmit);
        }

        const modal = document.getElementById('q-modal-ia');
        const genBtn = document.getElementById('q-btn-generate');
        const confirmStep = document.getElementById('q-step-confirm');
        const confirmBtnYes = document.getElementById('q-btn-confirm-yes');
        const confirmBtnNo = document.getElementById('q-btn-confirm-no');
        const uploadStep = document.getElementById('q-step-upload');
        const closeBtn = document.getElementById('q-close-btn');
        const backBtn = document.getElementById('q-btn-back');
        const retryBtn = document.getElementById('q-retry-btn');
        const realInput = document.getElementById('q-real-input');
        const triggerUpload = document.getElementById('q-trigger-upload');
        const phoneInput = document.getElementById('q-phone');

        let userPhoto = null;
        let selectedProductImg = '';

        function populateProductPicker() {
            try {
                const picker = document.getElementById('q-product-picker');
                if (!picker) return;
                picker.textContent = '';
                const allImgs = document.querySelectorAll(
                    '.product__media img, .product__media-item img, .product-gallery img, ' +
                    '.product-single__photo, .product-featured-media, .product__photo img, ' +
                    '[data-media-id] img, .product-images img, .product__image, ' +
                    '.product-media img, .product__media-wrapper img'
                );
                const seen = new Set();
                const validImgs = [...allImgs].filter(img => {
                    const src = img.src.split('?')[0];
                    if (seen.has(src)) return false;
                    seen.add(src);
                    return img.naturalWidth > 100 || img.width > 100 || img.src.includes('cdn.shopify');
                });
                // Mostra apenas a 1a, 2a, 4a, 5a e 6a foto (indices 0,1,3,4,5 — pula a 3a)
                const allowedIndices = [0, 1, 3, 4, 5];
                const filteredImgs = allowedIndices.filter(i => i < validImgs.length).map(i => validImgs[i]);

                const label = document.querySelector('.q-product-picker-label');
                if (filteredImgs.length === 0) {
                    picker.style.display = 'none';
                    if (label) label.style.display = 'none';
                    return;
                }
                picker.style.display = 'flex';
                if (label) label.style.display = 'block';
                let first = true;
                filteredImgs.forEach((img) => {
                    const thumb = document.createElement('div');
                    thumb.className = 'q-product-thumb' + (first ? ' selected' : '');
                    const thumbImg = document.createElement('img');
                    thumbImg.src = img.src;
                    thumb.appendChild(thumbImg);
                    thumb.addEventListener('click', () => {
                        picker.querySelectorAll('.q-product-thumb').forEach(t => t.classList.remove('selected'));
                        thumb.classList.add('selected');
                        selectedProductImg = img.src;
                    });
                    picker.appendChild(thumb);
                    if (first) { selectedProductImg = img.src; first = false; }
                });
            } catch(_) {}
        }

        function openModal() { populateProductPicker(); modal.style.display = 'flex'; lockBodyScroll(); }
        function closeModal() { modal.style.display = 'none'; unlockBodyScroll(); }

        // Bloqueia mousedown/pointerdown para impedir lightbox da Shopify
        ['mousedown', 'mouseup', 'pointerdown', 'pointerup'].forEach(evt => {
            openBtn.addEventListener(evt, (e) => {
                e.stopPropagation();
                e.preventDefault();
            }, true);
        });
        // Click abre o modal e bloqueia propagacao
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openModal();
        }, true);
        inlineBtn.onclick = () => openModal();
        closeBtn.onclick = () => closeModal();
        backBtn.onclick = () => closeModal();
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        retryBtn.onclick = () => {
            document.getElementById('q-step-result').style.display = 'none';
            uploadStep.style.display = 'block';
            document.querySelector('.q-card-ia').classList.remove('is-result');
            userPhoto = null;
            document.getElementById('q-pre-view').style.display = 'none';
            checkFields();
        };

        triggerUpload.onclick = () => realInput.click();

        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            checkFields();
        });

        function checkFields() {
            const nums = phoneInput.value.replace(/\D/g, '');
            const phoneOk = nums.length >= 10 && nums.length <= 11;
            document.getElementById('q-phone-error').style.display = (phoneInput.value.length > 0 && !phoneOk) ? 'block' : 'none';
            phoneInput.style.borderColor = (phoneInput.value.length > 0 && !phoneOk) ? '#ef4444' : 'var(--q-border)';
            genBtn.disabled = !(userPhoto && phoneOk && document.getElementById('q-accept-terms').checked);
        }

        document.getElementById('q-accept-terms').onchange = checkFields;

        realInput.onchange = (e) => {
            userPhoto = e.target.files[0];
            if (userPhoto) {
                const rd = new FileReader();
                rd.onload = ev => {
                    document.getElementById('q-pre-img').src = ev.target.result;
                    document.getElementById('q-pre-view').style.display = 'block';
                    checkFields();
                };
                rd.readAsDataURL(userPhoto);
            }
        };

        genBtn.onclick = () => {
            if (!userPhoto) return;
            confirmStep.style.display = 'flex';
            confirmStep.style.pointerEvents = 'auto';
        };

        confirmBtnNo.onclick = () => {
            confirmStep.style.display = 'none';
            confirmStep.style.pointerEvents = 'none';
        };

        confirmBtnYes.onclick = async () => {
            confirmStep.style.display = 'none';
            confirmStep.style.pointerEvents = 'none';
            uploadStep.style.display = 'none';
            document.getElementById('q-loading-box').style.display = 'block';

            const keyToUse = window.PROVOU_LEVOU_API_KEY;
            if (!keyToUse || keyToUse.includes("COLOQUE_A_CHAVE_AQUI")) {
                alert("Erro: API Key nao configurada.");
                document.getElementById('q-loading-box').style.display = 'none';
                uploadStep.style.display = 'block';
                return;
            }

            // Usa a imagem selecionada pelo cliente no picker
            const prodImg = selectedProductImg || (document.querySelector('meta[property="og:image"]')?.content || '');
            const prodName = document.querySelector('h1.product__title,.product-single__title,h1')?.innerText || document.title;

            try {
                const fd = new FormData();
                fd.append('person_image', userPhoto);
                fd.append('whatsapp', '55' + phoneInput.value.replace(/\D/g, ''));
                fd.append('phone_raw', phoneInput.value);
                fd.append('product_name', prodName);
                fd.append('api_key', keyToUse);

                if (prodImg) {
                    try { const b = await fetch(prodImg).then(r => r.blob()); fd.append('product_image', b, 'p.png'); } catch (_) { }
                }

                const webhookUrl = detectWebhook();
                const res = await fetch(webhookUrl, { method: 'POST', body: fd });
                if (res.ok) {
                    const blob = await res.blob();
                    document.getElementById('q-loading-box').style.display = 'none';
                    document.getElementById('q-final-view-img').src = URL.createObjectURL(blob);
                    document.querySelector('.q-card-ia').classList.add('is-result');
                    document.getElementById('q-step-result').style.display = 'flex';
                } else if (res.status === 401 || res.status === 403) {
                    document.getElementById('q-loading-box').style.display = 'none';
                    uploadStep.style.display = 'block';
                    alert("Provas virtuais indisponiveis nesta loja no momento.");
                } else { throw new Error(); }
            } catch (e) {
                document.getElementById('q-loading-box').style.display = 'none';
                uploadStep.style.display = 'block';
                alert('Ocorreu um erro ao processar sua imagem. Tente novamente.');
            }
        };


        /* LOGICA ADD-TO-CART DESATIVADA TEMPORARIAMENTE — VOLTAREMOS EM BREVE
        document.getElementById('q-add-to-cart-btn').onclick = () => {
            function tryAddToCart() {
                const addBtnSelectors = [
                    'button[name="add"]', 'button.product-form__submit',
                    '.btn-add-to-cart', '[data-action="add-to-cart"]',
                    'button[data-btn-addtocart]', '.product-form button[type="submit"]',
                    'form[action*="/cart/add"] button[type="submit"]',
                    '#AddToCart', '#add-to-cart', '.add-to-cart',
                    '[id*="add-to-cart"]', '[class*="add-to-cart"]', '[class*="addtocart"]',
                ];
                for (const sel of addBtnSelectors) {
                    const btn = document.querySelector(sel);
                    if (btn && !btn.disabled) { btn.click(); return true; }
                }
                return false;
            }

            const ok = tryAddToCart();
            if (!ok) setTimeout(() => tryAddToCart(), 400);
            closeModal();
        };
        */
    }


    const isProductPage = window.location.pathname.includes('/products/') ||
        window.location.pathname.includes('preview.html') ||
        window.location.protocol === 'file:';

    if (isProductPage) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
        else init();
    }
})();
