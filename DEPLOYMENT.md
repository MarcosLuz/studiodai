# 🚀 Guia de Deploy - Estúdio Ametista

## Checklist Pré-Deploy

### ✅ Arquivos Essenciais
- [x] `index.html` - Estrutura principal
- [x] `styles.css` - Estilos sofisticados
- [x] `script.js` - Interações avançadas
- [x] `manifest.json` - PWA manifest
- [x] `README.md` - Documentação
- [x] `.gitignore` - Controle de versão

### ✅ Otimizações de Performance
- [x] CSS minificado na produção
- [x] JavaScript otimizado
- [x] Imagens com fallbacks do Unsplash
- [x] Loading lazy implementado
- [x] Meta tags para SEO

### ✅ Responsividade Testada
- [x] Desktop (> 1024px)
- [x] Tablet (768px - 1024px)  
- [x] Mobile (< 768px)

## Opções de Deploy

### 1. 🌟 Netlify (Recomendado)
```bash
# Drag & drop ou conectar repositório Git
# Configurações automáticas
# SSL gratuito
# CDN global
```

**Configurações Netlify:**
- Build command: (não necessário para HTML estático)
- Publish directory: `/` (raiz do projeto)
- Custom headers em `_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### 2. 🔥 Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### 3. 📁 GitHub Pages
1. Push para repositório GitHub
2. Ativar GitHub Pages nas configurações
3. Selecionar branch main como source

### 4. ⚡ Vercel
```bash
npm install -g vercel
vercel --prod
```

### 5. 🔧 Servidor Tradicional (Apache/Nginx)

#### Apache (.htaccess)
```apache
# Compressão Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript
</IfModule>

# Cache Headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# HTTPS Redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### Nginx
```nginx
server {
    listen 80;
    server_name estudioametista.com.br;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name estudioametista.com.br;
    
    # SSL Config
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/private.key;
    
    # Gzip
    gzip on;
    gzip_types text/css application/javascript text/html;
    
    location / {
        root /var/www/estudio-ametista;
        try_files $uri $uri/ /index.html;
        
        # Cache headers
        location ~* \.(css|js|png|jpg|jpeg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## Domínio Personalizado

### DNS Records
```
Type: A
Name: @
Value: [IP do servidor]

Type: CNAME  
Name: www
Value: estudioametista.com.br
```

### SSL Certificate
- Let's Encrypt (gratuito)
- Cloudflare (gratuito com proxy)
- Certificado pago

## Monitoramento e Analytics

### Google Analytics 4
Adicionar no `<head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Verificar propriedade do domínio
2. Enviar sitemap (criar `sitemap.xml`)
3. Monitorar indexação

### Performance Monitoring
- **PageSpeed Insights**: Testar velocidade
- **GTmetrix**: Análise detalhada
- **Lighthouse**: Auditoria completa
- **Uptime Robot**: Monitoramento de uptime

## Checklist Pós-Deploy

### ✅ Testes Funcionais
- [ ] Loading screen funciona
- [ ] Menu mobile responsivo  
- [ ] Formulário de contato
- [ ] Links WhatsApp funcionais
- [ ] Animações suaves em todos os dispositivos
- [ ] Fallback de imagens ativo

### ✅ Testes de Performance
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 4s
- [ ] Time to Interactive < 5s
- [ ] Cumulative Layout Shift < 0.1

### ✅ SEO Básico
- [ ] Meta tags preenchidas
- [ ] Open Graph configurado
- [ ] Schema markup (opcional)
- [ ] Sitemap XML criado
- [ ] robots.txt configurado

### ✅ Acessibilidade
- [ ] Contraste adequado
- [ ] Navegação por teclado
- [ ] Alt texts em imagens
- [ ] Landmarks semânticos

## Manutenção Contínua

### Atualizações de Conteúdo
- Horários de aulas
- Novos serviços
- Depoimentos de clientes
- Fotos do estúdio

### Monitoramento Mensal
- Métricas de performance
- Rankings de SEO
- Feedback de usuários
- Atualizações de segurança

### Backups
- Backup semanal do código
- Versionamento no Git
- Documentação de mudanças

---

## 🎯 Próximos Passos Recomendados

1. **Imagens Reais**: Substituir fallbacks por fotos do estúdio
2. **Vídeo Hero**: Adicionar vídeo real das aulas
3. **Depoimentos**: Incluir seção com feedback de clientes
4. **Blog**: Área de conteúdo sobre yoga e pilates
5. **Agendamento**: Sistema de reservas integrado
6. **Google Maps**: Localização interativa

---

**🔮 Estúdio Ametista - Website Premium Pronto para Produção!**