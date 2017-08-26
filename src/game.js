var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
    preload: function() {
        // Parallax background loading
        game.load.image('forest-back', 'assets/images/background03/layer_07.png');
        game.load.image('forest-cloud', 'assets/images/background03/layer_06.png');
        game.load.image('forest-mountain', 'assets/images/background03/layer_05.png');
        game.load.image('forest-tree', 'assets/images/background03/layer_04.png');
        game.load.image('forest-floor', 'assets/images/background03/layer_03.png');
    
        // Monster spritesheets loading
        game.load.spritesheet('flower-plant', 'assets/images/monsters/flower-plant_200x266.png', 200, 266, 2);
        game.load.spritesheet('green-horn-monster', 'assets/images/monsters/green-horn-monster_200x179.png', 200, 179, 2);
        game.load.spritesheet('green-horn-zombie', 'assets/images/monsters/green-horn-zombie_200x227.png', 200, 227, 2);
        game.load.spritesheet('horn_skull', 'assets/images/monsters/horn_skull_200x216.png', 200, 216, 2);
        game.load.spritesheet('land-monster', 'assets/images/monsters/land-monster_200x266.png', 200, 266, 2);
        game.load.spritesheet('orange-land-monster', 'assets/images/monsters/orange-land-monster-200x149.png', 200, 149, 2);
        game.load.spritesheet('pink-monster', 'assets/images/monsters/pink-monster_200x170.png', 200, 170, 2);
        game.load.spritesheet('red-zombie', 'assets/images/monsters/red-zombie_200x219.png', 200, 219, 2);
        game.load.spritesheet('shadow-skull', 'assets/images/monsters/shadow-skull_200x216.png', 200, 216, 2);
        game.load.spritesheet('skull-land-monster', 'assets/images/monsters/skull-land-monster_200x192.png', 200, 192, 2);
        game.load.spritesheet('underground-worm', 'assets/images/monsters/underground-worm_200x221.png', 200, 221, 2);
        game.load.spritesheet('walking-monster', 'assets/images/monsters/walking-monster_200x232.png', 200, 232, 2);
        game.load.spritesheet('walking-green-monster', 'assets/images/monsters/walking-green-monster_200x211.png', 200, 211, 2);
        game.load.spritesheet('blue-monster', 'assets/images/monsters/blue-monster_200x237.png', 200, 237, 2);
        game.load.spritesheet('fly-monster', 'assets/images/monsters/fly-monster_200x155.png', 200, 155, 3);
        game.load.spritesheet('land-monster2', 'assets/images/monsters/land-monster2_200x158.png', 200, 158, 2);
        game.load.spritesheet('spiky-land-monster', 'assets/images/monsters/spiky-land-monster_200x200.png', 200, 200, 2);

        // Icons loading
        game.load.image('gold_coin', 'assets/images/496_RPG_icons/I_GoldCoin.png');
        game.load.image('dagger', 'assets/images/496_RPG_icons/W_Dagger002.png');
        game.load.image('swordIcon1', 'assets/images/496_RPG_icons/W_Sword001.png');
        
        // Upgrades container
        var bmd = this.game.add.bitmapData(250, 500);
        bmd.ctx.fillStyle = '#9a783d';
        bmd.ctx.strokeStyle = '#35371c';
        bmd.ctx.lineWidth = 12;
        bmd.ctx.fillRect(0, 0, 250, 500);
        bmd.ctx.strokeRect(0, 0, 250, 500);
        this.game.cache.addBitmapData('upgradePanel', bmd);
        
        // Buttons container
        var buttonImage = this.game.add.bitmapData(476, 48);
        buttonImage.ctx.fillStyle = '#e6dec7';
        buttonImage.ctx.strokeStyle = '#35371c';
        buttonImage.ctx.lineWidth = 4;
        buttonImage.ctx.fillRect(0, 0, 225, 48);
        buttonImage.ctx.strokeRect(0, 0, 225, 48);
        this.game.cache.addBitmapData('button', buttonImage);
        
        // World progression
        this.level = 1;
        // Monster killed during level
        this.levelKills = 0;
        // Monster kill required to advance a level
        this.levelKillsRequired = 10;
    },
    create: function() {
        var state = this;
    
        // Background management:
        this.utils().createBackground(this);
        
        // Monsters
        this.utils().createMonsters(this);
        
        // The main player
        this.utils().createPlayer();
    
        // Create Monster info
        this.utils().createMonsterInfo();
        
        // Initialize damage
        this.utils().createDamage();
    
        // Initialize gold
        this.utils().createGold();
        
        // Build upgrade panel
        this.utils().createUpgratePanel(this);
        
        this.dpsTimer = this.game.time.events.loop(100, this.onDPS, this);
    },
    render: function() {
    
    },
    onClickMonster: function (monster, pointer) {
        this.currentMonster.damage(this.player.clickDmg);
        this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + ' HP' : 'DEAD';
        var dmgText = this.dmgTextPool.getFirstExists(false);
        if(dmgText){
            dmgText.text = this.player.clickDmg;
            dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
            dmgText.alpha = 1;
            dmgText.tween.start();
        }
    },
    onKilledMonster: function (monster) {
        // Move monster offscreen
        monster.position.set(1000, this.game.world.centerY);
        
        var coin;
        coin = this.coins.getFirstExists(false);
        coin.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 200), this.game.world.centerY + this.game.rnd.integerInRange(-100, 100));
        coin.goldValue = Math.round(this.level * 1.33);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.onClickCoin, this, coin);
        
        this.levelKills++;
        
        if(this.levelKills >= this.levelKillsRequired){
            this.level++;
            this.levelKills = 0;
        }
    
        this.levelText.text = 'level: ' + this.level;
        this.levelKillsText.text = 'Kills: ' + this.levelKills + '/' + this.levelKillsRequired;
    
        // pick a new monster
        this.currentMonster = this.monsters.getRandom();
        // Upgrade monster based on level
        this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + ((this.level - 1) * 10.6));
        // Heal monster
        this.currentMonster.revive(this.currentMonster.maxHealth);
    
    },
    onReviveMonster: function (monster) {
        monster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
        this.monsterNameText.text = monster.details.name;
        this.monsterHealthText.text = monster.health + 'HP';
    },
    onClickCoin: function (coin) {
        if (!coin.alive) {
            return;
        }
        this.player.gold += coin.goldValue;
        this.playerGoldText.text = 'Money: ' + this.player.gold;
        coin.kill();
    },
    onUpgradeButtonClick: function (button, pointer) {
        
        function getAdjustedCost() {
            return Math.ceil(button.details.cost + (button.details.level * 1.46));
        }
        
        if(this.player.gold - button.details.cost >= 0){
            this.player.gold -= button.details.cost;
            this.playerGoldText.text = 'Money: ' + this.player.gold;
            button.details.level++;
            button.text.text = button.details.name + ': ' + button.details.level;
            button.details.cost = getAdjustedCost();
            button.costText.text = 'Cost: ' + button.details.cost;
            button.details.purchaseHandler.call(this, button, this.player);
        }
    },
    onDPS: function () {
        if(this.player.dps > 0){
            if(this.currentMonster && this.currentMonster.alive){
                var dmg = this.player.dps / 10;
                this.currentMonster.damage(dmg);
                this.monsterHealthText.text = this.currentMonster.alive ? Math.round(this.currentMonster.health) + ' HP' : 'DEAD';
            }
        }
    },
    utils: function () {
        var self = this;
        
        return {
            createBackground: function (state) {
                self.background = self.game.add.group();
    
                ['forest-back', 'forest-cloud', 'forest-mountain', 'forest-tree', 'forest-floor']
                    .forEach(function (image) {
                        let bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                            state.game.world.height, image, '', state.background);
                        bg.tileScale.setTo(0.8, 0.8);
                    });
            },
            
            createMonsters: function (state) {
                const monsterData = [
                    {name: 'Flower Plant',      sprite: 'flower-plant',          maxHealth: 8},
                    {name: 'Green Horn',        sprite: 'green-horn-monster',    maxHealth: 20},
                    {name: 'Green Horn Zombie', sprite: 'green-horn-zombie',     maxHealth: 30},
                    {name: 'Horn Skull',        sprite: 'horn_skull',            maxHealth: 13},
                    {name: 'Landy',             sprite: 'land-monster',          maxHealth: 2},
                    {name: 'Orange Land',       sprite: 'orange-land-monster',   maxHealth: 5},
                    {name: 'Pinkette',          sprite: 'pink-monster',          maxHealth: 15},
                    {name: 'Red Zombie',        sprite: 'red-zombie',            maxHealth: 15},
                    {name: 'Shadow Skull',      sprite: 'shadow-skull',          maxHealth: 30},
                    {name: 'Skull Land',        sprite: 'skull-land-monster',    maxHealth: 8},
                    {name: 'Underground Worm',  sprite: 'underground-worm',      maxHealth: 20},
                    {name: 'Walking Freak',     sprite: 'walking-monster',       maxHealth: 10},
                    {name: 'Walking Green',     sprite: 'walking-green-monster', maxHealth: 15},
                    {name: 'Bluggu',            sprite: 'blue-monster',          maxHealth: 4},
                    {name: 'Birdy',             sprite: 'fly-monster',           maxHealth: 23},
                    {name: 'Bigi',              sprite: 'land-monster2',         maxHealth: 25},
                    {name: 'Spiky',             sprite: 'spiky-land-monster',    maxHealth: 27},
                ];
    
                self.monsters = self.game.add.group();
                let monster;
                monsterData.forEach(function (data) {
                    // Create a sprite of each monster out of screen
                    monster = state.monsters.create(1000, state.game.world.centerY, data.sprite);
                    // Center anchor
                    monster.anchor.setTo(0.5);
                    // ref to the database
                    monster.details = data;
    
                    //  Here we add a new animation called 'walk'
                    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
                    monster.animations.add('walk');
    
                    //  And this starts the animation playing by using its key ("walk")
                    //  30 is the frame rate (30fps)
                    //  true means it will loop when it finishes
                    monster.animations.play('walk', 3, true);
        
                    monster.health = monster.maxHealth = data.maxHealth;
        
                    // enable input so we can click it
                    monster.inputEnabled = true;
                    monster.events.onInputDown.add(state.onClickMonster, state);
                    monster.events.onKilled.add(state.onKilledMonster, state);
                    monster.events.onRevived.add(state.onReviveMonster, state);
                });
    
                self.currentMonster = self.monsters.getRandom();
                self.currentMonster.position.set(self.game.world.centerX + 100, self.game.world.centerY);
            },
            createMonsterInfo: function () {
                self.monsterInfoUI = self.game.add.group();
                self.monsterInfoUI.position.setTo(self.currentMonster.x - 220, self.currentMonster.y + 120);
                self.monsterNameText = self.monsterInfoUI.addChild(self.game.add.text(0, 0, self.currentMonster.details.name, {
                    font: '48px Arial Black',
                    fill: '#fff',
                    strokeThickness: 4
                } ));
                self.monsterHealthText = self.monsterInfoUI.addChild(self.game.add.text(0, 80, self.currentMonster.health + 'HP', {
                    font: '32px Arial Black',
                    fill: '#ff0000',
                    strokeThickness: 4
                } ));
                
                self.levelUI = self.game.add.group();
                self.levelUI.position.setTo(self.game.world.centerX, 30);
                self.levelText = self.levelUI.addChild(self.game.add.text(0, 0, 'Level: ' + self.level, {
                    font: '24px Arial Black',
                    fill: '#fff',
                    strokeThickness: 4
                } ));
                self.levelKillsText = self.levelUI.addChild(self.game.add.text(0, 30, 'Kills: ' + self.levelKills + '/' + self.levelKillsRequired, {
                    font: '24px Arial Black',
                    fill: '#fff',
                    strokeThickness: 4
                } ));
            },
            createPlayer: function () {
                self.player = {
                    clickDmg: 1,
                    gold: 0,
                    dps: 0
                };
            },
            createDamage: function () {
                self.dmgTextPool = self.add.group();
                let dmgText;
    
                for(let d=0; d<50; d++){
                    dmgText = self.add.text(0,0,'1', {
                        font: '64px Arial Black',
                        fill: '#fff',
                        strokeThickness: 4
                    });
                    dmgText.exists = false;
                    dmgText.tween = game.add.tween(dmgText)
                        .to({
                            alpha: 0,
                            y: 100,
                            x: self.game.rnd.integerInRange(100, 700)
                        }, 1000, Phaser.Easing.Cubic.Out);
        
                    dmgText.tween.onComplete.add(function (text, tween) {
                        text.kill();
                    });
                    self.dmgTextPool.add(dmgText);
                }
            },
            createGold: function (state) {
                self.coins = self.add.group();
                self.coins.createMultiple(50, 'gold_coin', '', false);
                self.coins.setAll('inputEnabled', true);
                self.coins.setAll('goldValue', 1);
                self.coins.callAll('events.onInputDown.add', 'events.onInputDown', self.onClickCoin, self);
    
                self.playerGoldText = self.add.text(30, 30, 'Money: ' + self.player.gold, {
                    font: '24px Arial Black',
                    fill: '#fff',
                    strokeThickness: 4
                });
            },
            createUpgratePanel: function (state) {
    
                var upgradeButtonsData = [
                    {
                        icon: 'dagger',
                        name:'Attack',
                        level: 1,
                        cost: 5,
                        purchaseHandler: function (button, player) {
                            player.clickDmg += 1;
                        }
                    },
                    {
                        icon: 'swordIcon1',
                        name:'Auto-Attack',
                        level: 0,
                        cost: 25,
                        purchaseHandler: function (button, player) {
                            player.dps += 5;
                        }
                    }
                ];
                
                state.upgradePanel = state.game.add.image(10, 70, state.game.cache.getBitmapData('upgradePanel'));
                var upgradeButtons = self.upgradePanel.addChild(self.game.add.group());
                upgradeButtons.position.setTo(8, 8);
                
    
                var button;
                upgradeButtonsData.forEach(function (buttonData, index) {
                    button = self.game.add.button(0, (50 * index), self.game.cache.getBitmapData('button'));
                    button.icon = button.addChild(state.game.add.image(6, 6, buttonData.icon));
                    button.text = button.addChild(state.game.add.text(42, 6, buttonData.name + ': ' + buttonData.level, {font: '16px Arial Black'}));
                    button.details = buttonData;
                    button.costText = button.addChild(state.game.add.text(42, 24, 'Cost: ' + buttonData.cost, {font: '16px Arial Black'}));
                    button.events.onInputDown.add(state.onUpgradeButtonClick, state);
    
                    upgradeButtons.addChild(button);
                });
                
                
            }
        }
    }
});

game.state.start('play');