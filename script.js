        // Get all the elements we need to work with
        const box = document.getElementById('animationBox');
        const pulseBtn = document.getElementById('pulseBtn');
        const bounceBtn = document.getElementById('bounceBtn');
        const spinBtn = document.getElementById('spinBtn');
        const themeButtons = document.querySelectorAll('.theme-btn');
        const body = document.body;

        // When the page loads, check if we saved any preferences
        function loadPreferences() {
            // Check for saved theme
            const savedTheme = localStorage.getItem('theme') || 'light';
            body.className = savedTheme;
            
            // Check if pulse was active
            if (localStorage.getItem('pulseActive') === 'true') {
                box.classList.add('pulse');
            }
            
            // Check if spin was active
            if (localStorage.getItem('spinActive') === 'true') {
                box.classList.add('spin');
            }
        }

        // Change the background theme
        function setTheme(theme) {
            // Remove all theme classes first
            body.className = '';
            // Add the selected theme class
            body.classList.add(theme);
            // Save to localStorage
            localStorage.setItem('theme', theme);
        }

        // Toggle the pulse animation
        function togglePulse() {
            box.classList.toggle('pulse');
            localStorage.setItem('pulseActive', box.classList.contains('pulse'));
        }

        // Make the box bounce once
        function makeBounce() {
            box.classList.add('bounce');
            
            // Remove the bounce class after animation finishes
            box.addEventListener('animationend', function() {
                box.classList.remove('bounce');
            }, { once: true });
        }

        // Toggle the spin animation
        function toggleSpin() {
            box.classList.toggle('spin');
            localStorage.setItem('spinActive', box.classList.contains('spin'));
        }

        // Make the box change when clicked
        box.addEventListener('click', function() {
            this.textContent = 'Clicked!';
            this.style.backgroundColor = '#34a853';
            
            setTimeout(() => {
                this.textContent = 'Click Me!';
                this.style.backgroundColor = '#4285f4';
            }, 1000);
        });

        // Add click events to buttons
        pulseBtn.addEventListener('click', togglePulse);
        bounceBtn.addEventListener('click', makeBounce);
        spinBtn.addEventListener('click', toggleSpin);

        // Add click events to theme buttons
        themeButtons.forEach(button => {
            button.addEventListener('click', function() {
                setTheme(this.dataset.theme);
            });
        });

        // Load any saved preferences when page starts
        loadPreferences();