import React, { useEffect, useRef } from 'react';

const JarvisLightBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        const stars = [];
        // Adjusted per user request: decreased dots to keep space uncluttered
        const density = window.innerWidth < 768 ? 60 : 180;
        const numStars = Math.min(Math.floor(window.innerWidth * 0.4), density);
        
        const mouse = { x: null, y: null, radius: 100 };

        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => setCanvasSize();

        let targetWarp = 0;
        let currentWarp = 0;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;
            
            // Map scroll speed to target warp (rocket effect)
            targetWarp = Math.max(Math.min(delta * 0.8, 80), -80);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        const brandColors = [
            'rgba(240, 90, 102, 0.8)', // BerryPink
            'rgba(174, 221, 76, 0.8)', // BerryGreen
            'rgba(31, 41, 55, 0.4)',   // Deep dark slate
            'rgba(59, 130, 246, 0.8)', // Blue accent
            'rgba(156, 163, 175, 0.6)' // Neutral grey
        ];

        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Z-axis determines parallax depth (closer = bigger, faster)
                this.z = Math.random() * 0.9 + 0.1; 
                this.size = this.z * 2.2; 
                this.color = brandColors[Math.floor(Math.random() * brandColors.length)];
                // Base upward drift
                this.baseVy = this.z * 0.4;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Rocket warp-speed trail effect when scrolling
                if (Math.abs(currentWarp) > 1) {
                    ctx.beginPath();
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = this.size * 0.8;
                    ctx.lineCap = 'round';
                    ctx.moveTo(this.x, this.y);
                    // Stretch exactly in direction of scroll
                    ctx.lineTo(this.x, this.y - (currentWarp * this.z * 1.5));
                    ctx.stroke();
                }
            }

            update() {
                // Total speed = baseline drift + scrolling warp speed
                const totalVy = this.baseVy + (currentWarp * this.z);
                this.y -= totalVy;
                
                // Subtle Mouse Gravity / Repulsion
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        // Push stars gently away from cursor (parallax push)
                        this.x -= (dx / distance) * force * 1.5 * this.z;
                        this.y -= (dy / distance) * force * 1.5 * this.z;
                    }
                }

                // Wrap around edges smoothly
                if (this.y < 0) {
                    this.y += canvas.height;
                    this.x = Math.random() * canvas.width;
                } else if (this.y > canvas.height) {
                    this.y -= canvas.height;
                    this.x = Math.random() * canvas.width;
                }
                
                if (this.x < 0) this.x += canvas.width;
                else if (this.x > canvas.width) this.x -= canvas.width;
            }
        }

        // Initialize starfield
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }

        const animate = () => {
            // Smoothly decay warp back to zero for a buttery effect
            targetWarp *= 0.94;
            currentWarp += (targetWarp - currentWarp) * 0.15;

            // Faint trailing logic: using a semi-transparent clear instead of full clear
            // This leaves a very subtle trail behind stars that are moving extremely fast
            if (Math.abs(currentWarp) > 5) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
                stars[i].draw();
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'transparent' }} />;
};

export default JarvisLightBackground;
