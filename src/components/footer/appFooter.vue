<template>
    <footer>
        <div class="social-icons">
            <p>Контакты:</p>
            <div>
                <a href="#" target="_blank"><img src="/src/assets/img/Vector (2).png" alt=""></a>
                <a href="https://vk.com/iiiiii05" target="_blank"><img src="/src/assets/img/Vector (1).png" alt=""></a>
                <a href="#" target="_blank"><img src="/src/assets/img/iconFB.png" alt=""></a>
                <a href="#" target="_blank"><img src="/src/assets/img/Vector.png" alt=""></a>
            </div>
            <div class="phone-number">
                <a href="tel:+777777 7777777">+777777 7777777</a>
            </div>
        </div>
        <div class="enda">
            <p class="delivery1">© 2025 Camelia [Все права защищены]</p>
        </div>
    </footer>
</template>
<style scoped>
footer {
    min-height: 475px;
    width: 100%;
    position: relative;
}

.social-icons {
    position: absolute;
    box-sizing: border-box;
    bottom: 111px;
    width: 210px;
    height: 126px;
    transform: translateX(-50%);
    right: 5.56%;
    padding: 0 12.5px;
}

.social-icons p {
    text-align: center;
    color: #1e1e1e;
    font-size: 1.625em;
    letter-spacing: -5px;
    font-weight: 600;
}

.social-icons div {
    display: flex;
    justify-content: space-between;
}

.phone-number {
    width: 210px;
}

.phone-number a {
    text-align: center;
    font-weight: 600;
    font-size: 1.5em;
    color: #833b3f;
}

.enda {
    position: absolute;
    opacity: 63%;
    transform: translateX(-50%);
    left: 50%;
    bottom: 36px;
}
</style>