var tooltip;
(function(b) {
    function a(a, f) {
        var e = k.getBoundingClientRect(),
            b = e.right - e.left,
            e = e.bottom - e.top;
        k.style.left = b + (a + 15) > window.innerWidth ? a - b - 15 + "px" : a + 15 + "px";
        k.style.top = 0 < f - e ? f - e + "px" : f + 5 + "px"
    }

    function f() {
        k && k.parentElement.removeChild(k);
        h = k = null
    }

    function e(a, f, e) {
        var b = new r;
        d(a);
        e && (b.header = e);
        b.content = f;
        g.push(b);
        a.dataset ? a.dataset.tooltip = c : a.setAttribute("data-tooltip", c.toString());
        c++
    }

    function d(e) {
        e.onmouseenter = function(e) {
            var b = +e.target.getAttribute("data-tooltip");
            s !== e.target && (l =
                setInterval(function() {
                    m += .01;
                    if (.25 <= m) {
                        var e = n,
                            d = q,
                            c = g[b];
                        h !== b && f();
                        h = b;
                        k = c.html;
                        document.body.appendChild(k);
                        a(e, d);
                        m = 0;
                        clearInterval(l);
                        l = null
                    }
                }, 10));
            s = e.target
        };
        e.onmousemove = function(f) {
            f = f.pageX || f.pageY ? {
                x: f.pageX,
                y: f.pageY
            } : f.clientX || f.clientY ? {
                x: f.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                y: f.clientY + document.body.scrollTop + document.documentElement.scrollTop
            } : void 0;
            l || a(f.x, f.y);
            n = f.x;
            q = f.y
        };
        e.onmouseleave = function(a) {
            s = null;
            clearInterval(l);
            m = 0;
            f()
        }
    }
    var c =
        0,
        g = [],
        h, k, l, m = 0,
        n, q, s, r = function() {
            function a() {
                this.html = document.createElement("div");
                this.html.classList.add("tooltip-wrapper")
            }
            Object.defineProperty(a.prototype, "header", {
                get: function() {
                    return this.html.getElementsByClassName("tooltip-header")[0]
                },
                set: function(a) {
                    a.classList.add("tooltip-header");
                    this.html.appendChild(a)
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "content", {
                get: function() {
                    return this.html.getElementsByClassName("tooltip-content")[0]
                },
                set: function(a) {
                    a.classList.add("tooltip-content");
                    this.html.appendChild(a)
                },
                enumerable: !0,
                configurable: !0
            });
            return a
        }();
    b.complexModify = function(a, f, e) {
        a = g[a];
        e && (a.header.parentElement.removeChild(a.header), a.header = e);
        a.content.parentElement.removeChild(a.content);
        a.content = f
    };
    b.modify = function(a, f, e) {
        a = g[a];
        e && (a.header.textContent = e);
        a.content.textContent = f
    };
    b.retrieveContent = function(a) {
        return g[a].content
    };
    b.complexCreate = e;
    b.create = function(a, f, b) {
        var d = document.createElement("div");
        d.textContent = f;
        b ? (f = document.createElement("div"), f.textContent =
            b, e(a, d, f)) : e(a, d)
    }
})(tooltip || (tooltip = {}));
var msg;
(function(b) {
    function a() {
        for (var a = Date.now() - k, f = 0; f < g.length; ++f) {
            var b = g[f];
            b.timeElapsed += a / 1E3;
            b.timeElapsed >= b.timeout && e(b)
        }
        k = Date.now()
    }

    function f(a) {
        var f = "msg-" + c[a.type],
            f = f.toLowerCase(),
            d = document.createElement("div");
        d.classList.add("msg-container");
        var h = document.createElement("div");
        h.id = "message" + a.id;
        h.classList.add("msg");
        h.classList.add(f);
        f = document.createElement("div");
        f.textContent = a.text;
        f.classList.add("msg-content");
        var k = document.createElement("div");
        k.classList.add("msg-dismisser");
        k.textContent = "x";
        k.addEventListener("click", function() {
            e(g[g.indexOf(a)])
        }, !1);
        h.appendChild(k);
        h.appendChild(f);
        d.appendChild(h);
        b.messagePane.appendChild(d);
        a.decay && g.push(a)
    }

    function e(a) {
        var f = document.getElementById("message" + a.id);
        d(f);
        f.classList.add("msg-dismissing");
        f.setAttribute("height", f.scrollHeight + "px");
        g.splice(g.indexOf(a), 1)
    }

    function d(a) {
        for (var f = ["webkitTransitionEnd", "transitionend", "oTransitionEnd"], e = 0; e < f.length; e++) a.addEventListener(f[e], function(f) {
            b.messagePane.removeChild(a.parentElement)
        }, !1)
    }(function(a) {
        a[a.Error = 0] = "Error";
        a[a.Warning = 1] = "Warning";
        a[a.Notification = 2] = "Notification"
    })(b.Type || (b.Type = {}));
    var c = b.Type;
    b.start = function() {
        b.messagePane = document.createElement("div");
        b.messagePane.classList.add("msg-pane");
        document.body.appendChild(b.messagePane);
        setInterval(a, 100)
    };
    var g = [],
        h = 0;
    b.messagePane;
    var k = Date.now(),
        l = function() {
            function a() {
                this.text = "I'm a blank message. Oh no!";
                this.decay = !0;
                this.timeout = 10;
                this.type = 2;
                this.timeElapsed = 0;
                this.id = h;
                h++
            }
            a.prototype.send = function() {
                f(this)
            };
            return a
        }();
    b.message = l;
    b.create = function() {
        return new l
    }
})(msg || (msg = {}));
var modal;
(function(b) {
    function a() {
        b.activeWindow && b.activeWindow.hide();
        b.activeWindow = null
    }

    function f() {
        if (b.activeWindow) {
            var a = b.activeWindow.container.getBoundingClientRect();
            b.activeWindow.container.style.left = window.innerWidth / 2 - (a.right - a.left) / 2 + "px";
            b.activeWindow.container.style.top = window.innerHeight / 2 - (a.bottom - a.top) / 2 + "px"
        } else clearInterval(b.intervalIdentifier)
    }
    var e = 0,
        d;
    b.activeWindow;
    b.intervalIdentifier;
    b.hide = a;
    b.close = function() {
        if (b.activeWindow) {
            var f = b.activeWindow;
            a();
            f.container.parentNode.removeChild(f.container)
        }
    };
    var c = function() {
        function a() {
            this.container = document.createElement("div");
            this.container.addEventListener("click", function(a) {
                a.stopPropagation()
            }, !1);
            this.container.classList.add("modal-window");
            if (!d) {
                var f = document.createElement("div");
                d = f;
                f.classList.add("modal-wrapper");
                f.addEventListener("click", function(a) {
                    a.stopPropagation();
                    3E3 < Date.now() - e && b.close()
                }, !1);
                document.body.appendChild(f)
            }
            d.appendChild(this.container);
            this.titleEl = document.createElement("div");
            this.titleEl.classList.add("modal-header");
            this.bodyEl = document.createElement("div");
            this.container.appendChild(this.titleEl);
            this.container.appendChild(this.bodyEl)
        }
        Object.defineProperty(a.prototype, "title", {
            get: function() {
                return this._title
            },
            set: function(a) {
                this._title = a;
                this.titleEl.textContent = this._title
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.addElement = function(a) {
            this.bodyEl.appendChild(a)
        };
        a.prototype.addOption = function(a) {
            this.options || (this.options = document.createElement("div"), this.options.classList.add("modal-options"), this.container.appendChild(this.options));
            var f = document.createElement("span");
            f.classList.add("modal-option");
            var e = document.createElement("span");
            e.textContent = a;
            f.appendChild(e);
            this.options.appendChild(f);
            return f
        };
        a.prototype.addAffirmativeOption = function(a) {
            a = this.addOption(a);
            a.classList.add("affirmative");
            return a
        };
        a.prototype.addNegativeOption = function(a) {
            a = this.addOption(a);
            a.classList.add("negative");
            return a
        };
        a.prototype.show = function() {
            this.container.classList.contains("opened") || this.container.classList.add("opened");
            d.classList.contains("opened") ||
                d.classList.add("opened");
            b.activeWindow = this;
            f();
            b.intervalIdentifier = setInterval(f, 100);
            e = Date.now()
        };
        a.prototype.hide = function() {
            this.container.classList.contains("opened") && this.container.classList.remove("opened");
            d.classList.contains("opened") && d.classList.remove("opened")
        };
        return a
    }();
    b.Window = c
})(modal || (modal = {}));
var Data = function() {
        function b(a, f, e, b, c, g, h, k, l, m, n) {
            this.invconfigsave = [];
            this.itemSystem = a;
            this.gathererSystem = f;
            this.upgradeSystem = e;
            this.processorSystem = b;
            this.buffSystem = c;
            this.statisticSystem = g;
            this.achievementSystem = h;
            this.prestigeSystem = k;
            this.tabSystem = l;
            this.citySystem = m;
            this.storeSystem = n;
            this.initializeData();
            this.load()
        }
        b.prototype.importSave = function(a) {
            var f = localStorage.getItem("save");
            try {
                JSON.parse(LZString.decompressFromBase64(a));
                this.initializeData();
                localStorage.setItem("save",
                    a);
                this.load();
                game.upgradeSystem.ActivateOnLoad();
                var e = msg.create();
                e.type = 2;
                e.text = "Successfully imported save.";
                e.timeout = 5;
                e.send()
            } catch (b) {
                return this.initializeData(), localStorage.setItem("save", f), this.load(), e = msg.create(), e.type = 0, e.text = "Your save is invalid. It may be corrupt or for an incompatible version of Gold Rush.", e.timeout = 5, e.send(), !1
            }
        };
        b.prototype.InitializeItemSystem = function(a) {
            a.Reset();
            a.RegisterItem(Stone = Stone.SetName("Stone").SetQuantity(0).SetAlltime(0).SetValue(1).SetRarity(1).SetType(0).SetProbability(2E6));
            a.RegisterItem(Copper = Copper.SetName("Copper").SetQuantity(0).SetAlltime(0).SetValue(5).SetRarity(1).SetType(0).SetProbability(1E6));
            a.RegisterItem(Iron = Iron.SetName("Iron").SetQuantity(0).SetAlltime(0).SetValue(20).SetRarity(1).SetType(0).SetProbability(5E5));
            a.RegisterItem(Silver = Silver.SetName("Silver").SetQuantity(0).SetAlltime(0).SetValue(100).SetRarity(2).SetType(0).SetProbability(25E4));
            a.RegisterItem(Gold = Gold.SetName("Gold").SetQuantity(0).SetAlltime(0).SetValue(1E3).SetRarity(2).SetType(0).SetProbability(1E5));
            a.RegisterItem(Uranium = Uranium.SetName("Uranium").SetQuantity(0).SetAlltime(0).SetValue(5E3).SetRarity(3).SetType(0).SetProbability(5E3));
            a.RegisterItem(Titanium = Titanium.SetName("Titanium").SetQuantity(0).SetAlltime(0).SetValue(1E6).SetRarity(4).SetType(0).SetProbability(25));
            a.RegisterItem(Opal = Opal.SetName("Opal").SetQuantity(0).SetAlltime(0).SetValue(2E3).SetRarity(2).SetType(1).SetProbability(5E3));
            a.RegisterItem(Jade = Jade.SetName("Jade").SetQuantity(0).SetAlltime(0).SetValue(5E3).SetRarity(2).SetType(1).SetProbability(4E3));
            a.RegisterItem(Topaz = Topaz.SetName("Topaz").SetQuantity(0).SetAlltime(0).SetValue(1E4).SetRarity(3).SetType(1).SetProbability(3E3));
            a.RegisterItem(Sapphire = Sapphire.SetName("Sapphire").SetQuantity(0).SetAlltime(0).SetValue(25E3).SetRarity(3).SetType(1).SetProbability(2E3));
            a.RegisterItem(Emerald = Emerald.SetName("Emerald").SetQuantity(0).SetAlltime(0).SetValue(5E4).SetRarity(3).SetType(1).SetProbability(1E3));
            a.RegisterItem(Ruby = Ruby.SetName("Ruby").SetQuantity(0).SetAlltime(0).SetValue(1E5).SetRarity(3).SetType(1).SetProbability(750));
            a.RegisterItem(Onyx = Onyx.SetName("Onyx").SetQuantity(0).SetAlltime(0).SetValue(25E4).SetRarity(4).SetType(1).SetProbability(200));
            a.RegisterItem(Quartz = Quartz.SetName("Quartz").SetQuantity(0).SetAlltime(0).SetValue(5E5).SetRarity(4).SetType(1).SetProbability(20));
            a.RegisterItem(Diamond = Diamond.SetName("Diamond").SetQuantity(0).SetAlltime(0).SetValue(5E6).SetRarity(5).SetType(1).SetProbability(7));
            a.RegisterItem(Bronze_bar = Bronze_bar.SetName("Bronze bar").SetQuantity(0).SetAlltime(0).SetValue(250).SetRarity(2).SetType(3));
            a.RegisterItem(Iron_bar = Iron_bar.SetName("Iron bar").SetQuantity(0).SetAlltime(0).SetValue(1E3).SetRarity(2).SetType(3));
            a.RegisterItem(Silver_bar = Silver_bar.SetName("Silver bar").SetQuantity(0).SetAlltime(0).SetValue(2500).SetRarity(2).SetType(3));
            a.RegisterItem(Gold_bar = Gold_bar.SetName("Gold bar").SetQuantity(0).SetAlltime(0).SetValue(25E3).SetRarity(3).SetType(3));
            a.RegisterItem(Titanium_bar = Titanium_bar.SetName("Titanium bar").SetQuantity(0).SetAlltime(0).SetValue(5E6).SetRarity(5).SetType(3));
            a.RegisterItem(Ardigal = Ardigal.SetName("Bitter Root").SetQuantity(0).SetAlltime(0).SetValue(1E4).SetRarity(2).SetType(2).SetProbability(2E3));
            a.RegisterItem(Sito = Sito.SetName("Cubicula").SetQuantity(0).SetAlltime(0).SetValue(25E3).SetRarity(2).SetType(2).SetProbability(500));
            a.RegisterItem(Volencia = Volencia.SetName("Iron Flower").SetQuantity(0).SetAlltime(0).SetValue(5E5).SetRarity(4).SetType(2).SetProbability(250));
            a.RegisterItem(Fellstalk = Fellstalk.SetName("Tongtwista Flower").SetQuantity(0).SetAlltime(0).SetValue(1E6).SetRarity(4).SetType(2).SetProbability(100));
            a.RegisterItem(Redberries = Redberries.SetName("Thornberries").SetQuantity(0).SetAlltime(0).SetValue(1E3).SetRarity(2).SetType(2).SetProbability(2E3));
            a.RegisterItem(Jangerberries = Jangerberries.SetName("Transfruit").SetQuantity(0).SetAlltime(0).SetValue(5E3).SetRarity(2).SetType(2).SetProbability(1E3));
            a.RegisterItem(Snape_grass = Snape_grass.SetName("Melting Nuts").SetQuantity(0).SetAlltime(0).SetValue(1E4).SetRarity(3).SetType(2).SetProbability(250));
            a.RegisterItem(Vial_of_water = Vial_of_water.SetName("Empty vial").SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(2).SetType(3).SetPrice(1E3).SetStoreCategory(5));
            a.RegisterItem(Gunpowder = Gunpowder.SetName("Gunpowder").SetQuantity(0).SetAlltime(0).SetValue(1250).SetRarity(2).SetType(3).SetPrice(2500).SetStoreCategory(5));
            a.RegisterItem(Logs = Logs.SetName("Logs").SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(2).SetType(3));
            a.RegisterItem(Oil = Oil.SetName("Oil").SetDisplayInInventory(!1).SetQuantity(0).SetAlltime(0).SetValue(400).SetRarity(2));
            a.RegisterItem(Coins = Coins.SetName("Coins").SetDisplayInInventory(!1).SetQuantity(0).SetAlltime(0).SetValue(0));
            a.RegisterItem(Clicking_Potion = Clicking_Potion.SetName("Clicking Potion").SetQuantity(0).SetAlltime(0).SetValue(25E3).SetRarity(2).SetType(4));
            a.RegisterItem(Smelting_Potion = Smelting_Potion.SetName("Smelting Potion").SetQuantity(0).SetAlltime(0).SetValue(1E4).SetRarity(2).SetType(4));
            a.RegisterItem(Charming_Potion = Charming_Potion.SetName("Speech Potion").SetQuantity(0).SetAlltime(0).SetValue(5E4).SetRarity(3).SetType(4));
            a.RegisterItem(Alchemy_Potion = Alchemy_Potion.SetName("Alchemy Potion").SetQuantity(0).SetAlltime(0).SetValue(1E5).SetRarity(4).SetType(4));
            a.RegisterItem(Copper_Wire = Copper_Wire.SetName("Copper wire").SetQuantity(0).SetAlltime(0).SetValue(400).SetRarity(2).SetType(3));
            a.RegisterItem(TNT = TNT.SetName("TNT").SetQuantity(0).SetAlltime(0).SetValue(1E5).SetRarity(3).SetType(3));
            a.RegisterItem(Adblock = Adblock.SetName("Bandwidth").SetDisplayInInventory(!1).SetQuantity(0).SetAlltime(0).SetValue(0).SetRarity(1));
            a.RegisterItem(Steel_bar = Steel_bar.SetName("Steel bar").SetQuantity(0).SetAlltime(0).SetValue(5E3).SetRarity(3).SetType(3));
            a.RegisterRecipe(Copper_Wire_Recipe =
                Copper_Wire_Recipe.AddInput(new ItemQuantityPair(Bronze_bar, 10)).AddInput(new ItemQuantityPair(Copper, 1E3)).AddOutput(new ItemQuantityPair(Copper_Wire, 100)));
            a.RegisterRecipe(TNT_Recipe = TNT_Recipe.AddInput(new ItemQuantityPair(Gunpowder, 100)).AddInput(new ItemQuantityPair(Copper_Wire, 25)).AddOutput(new ItemQuantityPair(TNT, 1)))
        };
        b.prototype.InitializeGathererSystem = function(a) {
            a.Reset();
            a.RegisterItem(Player = Player.SetAutoMine(!1).SetQuantity(1).SetMaxOwned(1).setBaseFuelConsumed(0).SetName("Manual Clicking").setBaseEfficiency(1).setIncrEfficiency(1).setMiningOverride("Ores/click").AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
            a.RegisterItem(Miner = Miner.SetQuantity(0).SetMaxOwned(10).setBaseFuelConsumed(0).SetBasePrice(1E3).SetPriceModifier(1.15).setBaseEfficiency(.5).setIncrEfficiency(.5).SetName("Miner").AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
            a.RegisterItem(Lumberjack = Lumberjack.SetQuantity(0).setMiningOverride("Logs/tick").SetMaxOwned(10).setBaseFuelConsumed(0).SetName("Lumberjack").SetBasePrice(2E4).setBaseEfficiency(.5).setIncrEfficiency(.5).SetPriceModifier(1.15).AddGuaranteedOre(Logs).SetNothingChance(300));
            a.RegisterItem(Drill = Drill.SetQuantity(0).SetMaxOwned(10).setBaseFuelConsumed(10).setIncrFuelConsumed(1).SetName("Drill").SetBasePrice(1E6).setBaseEfficiency(3).setIncrEfficiency(5).setIncrProbability(.025).SetPriceModifier(1.15).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]).setRequires(Miner));
            a.RegisterItem(Crusher = Crusher.SetQuantity(0).SetMaxOwned(10).setBaseFuelConsumed(15).setIncrFuelConsumed(2).SetName("Crusher").SetBasePrice(5E6).setBaseEfficiency(10).setIncrEfficiency(10).setIncrProbability(.05).SetPriceModifier(1.15).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]).setRequires(Drill));
            a.RegisterItem(Excavator = Excavator.SetQuantity(0).SetMaxOwned(10).setBaseFuelConsumed(30).setIncrFuelConsumed(4).SetName("Excavator").SetBasePrice(5E8).setBaseEfficiency(20).setIncrEfficiency(20).setIncrProbability(.1).SetPriceModifier(1.15).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]).setRequires(Crusher));
            a.RegisterItem(MegaDrill = MegaDrill.SetQuantity(0).SetMaxOwned(10).setBaseFuelConsumed(65).setIncrFuelConsumed(8).SetName("Mega Drill").SetBasePrice(25E8).setBaseEfficiency(35).setIncrEfficiency(35).setIncrProbability(.175).SetPriceModifier(1.15).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]).setRequires(Environmental));
            a.RegisterItem(Pumpjack = Pumpjack.SetQuantity(0).setMiningOverride("Oil/tick").SetMaxOwned(100).setBaseFuelConsumed(0).setBaseEfficiency(.5).setIncrEfficiency(.5).SetName("Pumpjack").SetBasePrice(1E5).SetPriceModifier(1.15).AddGuaranteedOre(Oil));
            a.RegisterItem(BigTexan = BigTexan.SetQuantity(0).setMiningOverride("Oil/tick").SetMaxOwned(100).setBaseEfficiency(2).setIncrEfficiency(2).setBaseFuelConsumed(0).SetName("Big Texan").SetBasePrice(25E5).SetPriceModifier(1.15).AddGuaranteedOre(Oil).setRequires(Pumpjack))
        };
        b.prototype.InitializeUpgradeSystem = function(a) {
            a.Reset();
            a.RegisterItem(ClickUpgrade = ClickUpgrade.SetName("Click Upgrade").SetActive(!1).AddEffect(ClickUpgrade_Effect).SetType(0).SetPrice(1E3).SetStoreCategory(0));
            a.RegisterItem(ClickUpgrade2 = ClickUpgrade2.SetName("Click Upgrade II").SetActive(!1).AddEffect(ClickUpgrade2_Effect).SetType(0).SetPrice(5E4).SetRequires(ClickUpgrade).SetStoreCategory(0));
            a.RegisterItem(ClickUpgrade3 = ClickUpgrade3.SetName("Click Upgrade III").SetActive(!1).AddEffect(ClickUpgrade3_Effect).SetType(0).SetPrice(1E6).SetRequires(ClickUpgrade2).SetStoreCategory(0));
            a.RegisterItem(GoldenClick = GoldenClick.SetName("Gilded Clicks").SetActive(!1).AddEffect(GoldenClick_Effect).SetType(1).SetRequires(ClickUpgrade3).SetRecipe(GoldenClick_Recipe));
            a.RegisterItem(IronPickaxe = IronPickaxe.SetName("Iron Pickaxe").SetActive(!1).AddEffect(IronPickaxe_Effect).SetType(0).SetPrice(1E3).SetStoreCategory(0));
            a.RegisterItem(SteelPickaxe = SteelPickaxe.SetName("Steel Pickaxe").SetActive(!1).AddEffect(SteelPickaxe_Effect).SetType(0).SetPrice(2E4).SetRequires(IronPickaxe).SetStoreCategory(0));
            a.RegisterItem(GoldPickaxe = GoldPickaxe.SetName("Gold Pickaxe").SetActive(!1).AddEffect(GoldPickaxe_Effect).SetType(0).SetPrice(1E5).SetRequires(SteelPickaxe).SetStoreCategory(0));
            a.RegisterItem(DiamondPickaxe = DiamondPickaxe.SetName("Diamond Pickaxe").SetActive(!1).AddEffect(DiamondPickaxe_Effect).SetType(0).SetPrice(1E6).SetRequires(GoldPickaxe).SetStoreCategory(0));
            a.RegisterItem(Researcher = Researcher.SetName("Researcher").SetActive(!1).AddEffect(Researcher_Effect).SetType(0).SetPrice(1E6).SetStoreCategory(2));
            a.RegisterItem(Geologist = Geologist.SetName("Geologist").SetActive(!1).AddEffect(Geologist_Effect).SetType(0).SetPrice(1E8).SetRequires(Researcher).SetStoreCategory(2));
            a.RegisterItem(Backpack = Backpack.SetName("Backpack").SetActive(!1).AddEffect(Backpack_Effect).SetType(1).SetRecipe(Backpack_Recipe));
            a.RegisterItem(Botanist = Botanist.SetName("Botanist").SetActive(!1).AddEffect(Botanist_Effect).SetType(0).SetPrice(1E8).SetRequires(Backpack).SetStoreCategory(2));
            a.RegisterItem(Tunnels = Tunnels.SetName("Deeper Tunnels").SetActive(!1).AddEffect(Tunnels_Effect).SetType(1).SetRecipe(Tunnels_Recipe));
            a.RegisterItem(FurnaceUnlock = FurnaceUnlock.SetName("Furnace").SetActive(!1).SetType(0).SetPrice(5E6).SetStoreCategory(4).AddEffect(FurnaceUnlock_Effect));
            a.RegisterItem(CauldronUnlock = CauldronUnlock.SetName("Cauldron").SetActive(!1).SetType(0).SetPrice(25E6).SetStoreCategory(4).AddEffect(CauldronUnlock_Effect));
            a.RegisterItem(Foreman = Foreman.SetName("Supervisor").SetActive(!1).SetType(0).SetPrice(25E4).SetStoreCategory(2).AddEffect(Foreman_Effect));
            a.RegisterItem(Mechanic = Mechanic.SetName("Mechanic").SetActive(!1).SetType(0).SetPrice(25E5).SetStoreCategory(2).AddEffect(Mechanic_Effect));
            a.RegisterItem(ExpertMechanic = ExpertMechanic.SetName("Journeyman Mechanic").SetActive(!1).SetType(0).SetPrice(25E6).SetStoreCategory(2).AddEffect(ExpertMechanic_Effect).SetRequires(Mechanic));
            a.RegisterItem(Dictator = Dictator.SetName("Foreman").SetActive(!1).SetType(0).SetPrice(25E5).SetStoreCategory(2).AddEffect(Dictator_Effect).SetRequires(Foreman));
            a.RegisterItem(LargerCauldron = LargerCauldron.SetName("Larger Cauldron").SetActive(!1).AddEffect(LargerCauldron_Effect).SetType(1).SetRecipe(LargerCauldron_Recipe).SetRequires(CauldronUnlock));
            a.RegisterItem(ReinforcedFurnace = ReinforcedFurnace.SetName("Reinforced Furnace").SetActive(!1).AddEffect(ReinforcedFurnace_Effect).SetType(1).SetRecipe(ReinforcedFurnace_Recipe).SetRequires(FurnaceUnlock));
            a.RegisterItem(EnchantedCauldron = EnchantedCauldron.SetName("Bubblier Cauldron").SetActive(!1).SetType(1).AddEffect(EnchantedCauldron_Effect).SetRecipe(EnchantedCauldron_Recipe).SetRequires(LargerCauldron));
            a.RegisterItem(HotterFurnace = HotterFurnace.SetName("Hotter Furnace").SetActive(!1).AddEffect(HotterFurnace_Effect).SetType(1).SetRecipe(HotterFurnace_Recipe).SetRequires(ReinforcedFurnace));
            a.RegisterItem(Witch = Witch.SetName("Witch").SetActive(!1).SetType(0).SetPrice(5E7).SetStoreCategory(4).AddEffect(Witch_Effect).SetRequires(CauldronUnlock));
            a.RegisterItem(Blacksmith = Blacksmith.SetName("Blacksmith").SetActive(!1).SetType(0).SetPrice(1E7).SetStoreCategory(4).AddEffect(Blacksmith_Effect).SetRequires(FurnaceUnlock));
            a.RegisterItem(OilBaron = OilBaron.SetName("Oil Baron").SetActive(!1).SetType(0).SetPrice(1E8).SetStoreCategory(2).AddEffect(Oilbaron_Effect));
            a.RegisterItem(ConstructionOffice =
                ConstructionOffice.SetName("Construction Office").SetActive(!1).SetType(0).SetPrice(1E7).SetStoreCategory(2).AddEffect(ConstructionOffice_Effect));
            a.RegisterItem(BionicEyes = BionicEyes.SetName("Bionic Eyes").SetActive(!1).SetType(2).AddEffect(BionicEyes_Effect));
            a.RegisterItem(Environmental = Environmental.SetName("Enviroreport").SetActive(!1).SetType(2).AddEffect(Environmental_Effect));
            a.RegisterItem(ChainsawT1 = ChainsawT1.SetName("Chainsaws").SetActive(!1).SetType(1).AddEffect(ChainsawT1_Effect).SetRecipe(ChainsawT1_Recipe));
            a.RegisterItem(ChainsawT2 = ChainsawT2.SetName("Steel Chainsaws").SetActive(!1).SetType(1).SetRequires(ChainsawT1).AddEffect(ChainsawT2_Effect).SetRecipe(ChainsawT2_Recipe));
            a.RegisterItem(XrayDrills = XrayDrills.SetName("X-ray Drills").SetActive(!1).SetType(2).SetRequires(Drill).AddEffect(XrayDrills_Effect));
            a.RegisterItem(PrecisionCrushers = PrecisionCrushers.SetName("Precision Crushers").SetActive(!1).SetType(2).SetRequires(Crusher).AddEffect(PrecisionCrushers_Effect));
            a.RegisterItem(SelfLubrication =
                SelfLubrication.SetName("Self Lubricating").SetActive(!1).SetType(2).AddEffect(SelfLubrication_Effect));
            a.RegisterItem(UnleadedPlus = UnleadedPlus.SetName("Unleaded").SetActive(!1).SetType(3).SetPrice(25E6).AddEffect(UnleadedPlus_Effect));
            a.RegisterItem(SuperUnleaded = SuperUnleaded.SetName("Unleaded Plus").SetActive(!1).SetType(3).SetPrice(5E7).AddEffect(SuperUnleaded_Effect).SetRequires(UnleadedPlus));
            a.RegisterItem(HighPressurePumps = HighPressurePumps.SetName("High Pressure Pumps").SetActive(!1).SetType(3).SetPrice(15E6).AddEffect(HighPressurePumps_Effect));
            a.RegisterItem(HigherPressurePumps = HigherPressurePumps.SetName("Higher Pressure Pumps").SetActive(!1).SetType(3).SetPrice(4E7).AddEffect(HigherPressurePumps_Effect).SetRequires(HighPressurePumps));
            a.RegisterItem(CaffeinatedClerks = CaffeinatedClerks.SetName("Caffeinated Clerks").SetActive(!1).SetType(3).SetPrice(2E7).AddEffect(CaffeinatedClerks_Effect));
            a.RegisterItem(ExtraPump = ExtraPump.SetName("Extra Pump").SetActive(!1).SetType(3).AddEffect(ExtraPump_Effect).SetPrice(45E6).SetRequires(CaffeinatedClerks));
            a.RegisterItem(UltraUnleaded = UltraUnleaded.SetName("Super Unleaded").SetActive(!1).SetType(3).AddEffect(UltraUnleaded_Effect).SetPrice(1E8).SetRequires(SuperUnleaded));
            a.RegisterItem(GasJockey = GasJockey.SetName("Gas Jockey").SetActive(!1).SetType(3).AddEffect(GasJockey_Effect).SetPrice(75E6).SetRequires(HigherPressurePumps));
            a.RegisterItem(DieselPump = DieselPump.SetName("Diesel Pump").SetActive(!1).SetType(3).AddEffect(DieselPump_Effect).SetRequires(ExtraPump).SetPrice(8E7));
            a.RegisterItem(ChainsawT3 =
                ChainsawT3.SetName("Titanium Chainsaws").SetActive(!1).SetType(1).SetRequires(ChainsawT2).AddEffect(ChainsawT3_Effect).SetRecipe(ChainsawT3_Recipe));
            a.RegisterItem(ChainsawT4 = ChainsawT4.SetName("Diamond Chainsaws").SetActive(!1).SetType(1).SetRequires(ChainsawT3).AddEffect(ChainsawT4_Effect).SetRecipe(ChainsawT4_Recipe));
            a.RegisterItem(MiningCampUpgrade = MiningCampUpgrade.SetName("Mining Camp").SetActive(!1).AddEffect(MiningCampUpgrade_Effect));
            a.RegisterItem(LoggingCampUpgrade = LoggingCampUpgrade.SetName("Logging Camp").SetActive(!1).AddEffect(LoggingCampUpgrade_Effect))
        };
        b.prototype.InitializeProcessorSystem = function(a) {
            a.Reset();
            a.RegisterItem(Furnace = Furnace.SetName("Furnace").Reset().AddRecipe(Bronze_bar_processor_recipe).AddRecipe(Iron_bar_processor_recipe).AddRecipe(Silver_bar_processor_recipe).AddRecipe(Gold_bar_processor_recipe).AddRecipe(Titanium_bar_processor_recipe).AddRecipe(Steel_bar_processor_recipe));
            a.RegisterItem(Cauldron = Cauldron.SetName("Cauldron").Reset().AddRecipe(Smelting_Potion_processor_recipe).AddRecipe(Clicking_Potion_processor_recipe).AddRecipe(Charming_Potion_processor_recipe).AddRecipe(Alchemy_Potion_processor_recipe).SetCapacity(1))
        };
        b.prototype.InitializeBuffSystem = function(a) {
            a.Reset();
            a.RegisterItem(SpeechPotionBuff = SpeechPotionBuff.SetDuration(30).SetItem(Charming_Potion).SetUpgrade(SpeechPotionUpgrade).SetRemaining(0));
            a.RegisterItem(ClickingPotionBuff = ClickingPotionBuff.SetDuration(45).SetItem(Clicking_Potion).SetUpgrade(ClickingPotionUpgrade).SetRemaining(0));
            a.RegisterItem(AlchemyPotionBuff = AlchemyPotionBuff.SetDuration(300).SetItem(Alchemy_Potion).SetUpgrade(AlchemyPotionUpgrade).SetRemaining(0));
            a.RegisterItem(SmeltingPotionBuff =
                SmeltingPotionBuff.SetDuration(300).SetItem(Smelting_Potion).SetUpgrade(SmeltingPotionUpgrade).SetRemaining(0));
            a.RegisterItem(AdblockDebuff = AdblockDebuff.SetDuration(300).SetItem(Adblock).SetUpgrade(AdblockUpgrade).SetRemaining(0))
        };
        b.prototype.InitializeStatisticSystem = function(a) {
            a.Reset();
            a.RegisterItem(StatVersionNumber = StatVersionNumber.SetName("Version").SetValue(0));
            a.RegisterItem(StatRockClicked = StatRockClicked.SetName("Manual clicks").SetValue(0));
            a.RegisterItem(StatTimePlayed = StatTimePlayed.SetName("Time played").SetValue(0));
            a.RegisterItem(StatPopulation = StatPopulation.SetName("Population").SetValue(0));
            a.RegisterItem(StatMasochism = StatMasochism.SetName("Masochist").SetValue(0))
        };
        b.prototype.InitializeAchievementSystem = function(a) {
            a.Reset();
            a.RegisterItem(AchMoney1 = AchMoney1.SetName("New Money").SetCondition(new AchievementAlltime(Item[1] = [Coins], 1E4)).SetCompleted(!1));
            a.RegisterItem(AchMoney2 = AchMoney2.SetName("Millionaire").SetCondition(new AchievementAlltime(Item[1] = [Coins], 1E6)).SetRequires(AchMoney1).SetCompleted(!1));
            a.RegisterItem(AchMoney3 = AchMoney3.SetName("Billionaire").SetCondition(new AchievementAlltime(Item[1] = [Coins], 1E9)).SetRequires(AchMoney2).SetCompleted(!1));
            a.RegisterItem(AchMiner1 = AchMiner1.SetName("Miner").SetCondition((new AchievementStatistic(StatRockClicked, 100)).setTooltipOverride("Click the rock 100 times.")).SetCompleted(!1));
            a.RegisterItem(AchMiner2 = AchMiner2.SetName("Carpal Tunnel").SetCondition((new AchievementStatistic(StatRockClicked, 1E3)).setTooltipOverride("Click the rock 1,000 times.")).SetRequires(AchMiner1).SetCompleted(!1));
            a.RegisterItem(AchMiner3 = AchMiner3.SetName("Black Lung").SetCondition((new AchievementStatistic(StatRockClicked, 1E4)).setTooltipOverride("Click the rock 10,000 times.")).SetRequires(AchMiner2).SetCompleted(!1));
            a.RegisterItem(AchItemCatOre = AchItemCatOre.SetName("Geologist").SetCondition(new AchievementItemType(0)).SetCompleted(!1));
            a.RegisterItem(AchItemCatGem = AchItemCatGem.SetName("Gemologist").SetCondition(new AchievementItemType(1)).SetCompleted(!1));
            a.RegisterItem(AchItemCatCrafting = AchItemCatCrafting.SetName("Craftsman").SetCondition(new AchievementItemType(3)).SetCompleted(!1));
            a.RegisterItem(AchItemCatIngredient = AchItemCatIngredient.SetName("Shaman").SetCondition(new AchievementItemType(2)).SetCompleted(!1));
            a.RegisterItem(AchItemCatPotion = AchItemCatPotion.SetName("Wizard").SetCondition(new AchievementItemType(4)).SetCompleted(!1));
            a.RegisterItem(AchTimePlayed5m = AchTimePlayed5m.SetName("Minute Waster").SetCondition((new AchievementStatistic(StatTimePlayed, 300)).setTooltipOverride("Play for five minutes.")).SetCompleted(!1));
            a.RegisterItem(AchTimePlayed6h = AchTimePlayed6h.SetName("Hour Waster").SetCondition((new AchievementStatistic(StatTimePlayed,
                21600)).setTooltipOverride("Play for six hours.")).SetRequires(AchTimePlayed5m).SetCompleted(!1));
            a.RegisterItem(AchTimePlayed24h = AchTimePlayed24h.SetName("Day Waster").SetCondition((new AchievementStatistic(StatTimePlayed, 86400)).setTooltipOverride("Play for one day.")).SetRequires(AchTimePlayed6h).SetCompleted(!1));
            a.RegisterItem(AchTimePlayed7d = AchTimePlayed7d.SetName("Week Waster").SetCondition((new AchievementStatistic(StatTimePlayed, 604800)).setTooltipOverride("Play for one week.")).SetRequires(AchTimePlayed24h).SetCompleted(!1));
            a.RegisterItem(AchTimePlayed30d = AchTimePlayed30d.SetName("Life Waster").SetCondition((new AchievementStatistic(StatTimePlayed, 2419200)).setTooltipOverride("Play for one month.")).SetRequires(AchTimePlayed7d).SetCompleted(!1));
            a.RegisterItem(AchOil1 = AchOil1.SetName("Black Gold").SetCondition((new AchievementStatistic(StatOilConsumed, 1)).setTooltipOverride("Burn 1 unit of oil/tick.")).SetCompleted(!1));
            a.RegisterItem(AchOil2 = AchOil2.SetName("Texas Tea").SetCondition((new AchievementStatistic(StatOilConsumed,
                25)).setTooltipOverride("Burn 25 units of oil/tick")).SetCompleted(!1).SetRequires(AchOil1));
            a.RegisterItem(AchOil3 = AchOil3.SetName("Liberate Iraq").SetCondition((new AchievementStatistic(StatOilConsumed, 100)).setTooltipOverride("Burn 100 units of oil/tick")).SetCompleted(!1).SetRequires(AchOil2));
            a.RegisterItem(AchStone1 = AchStone1.SetName("He abides").SetCondition(new AchievementAlltime(Item[1] = [Stone], 1E6)).SetCompleted(!1));
            a.RegisterItem(AchStone2 = AchStone2.SetName("Dazed").SetCondition(new AchievementAlltime(Item[1] = [Stone], 1E7)).SetRequires(AchStone1).SetCompleted(!1));
            a.RegisterItem(AchStone3 = AchStone3.SetName("Dr. Gonzo").SetCondition(new AchievementAlltime(Item[1] = [Stone], 1E8)).SetRequires(AchStone2).SetCompleted(!1));
            a.RegisterItem(AchMasochist = AchMasochist.SetName("Masochist").SetCondition((new AchievementStatistic(StatMasochism, 500)).setTooltipOverride("Manually craft 500 TNT.")).SetCompleted(!1))
        };
        b.prototype.InitializePrestigeSystem = function(a) {
            a.Reset();
            a.RegisterItem(StonePrestige = StonePrestige.SetActive(!0).SetItem(Stone));
            a.RegisterItem(CopperPrestige = CopperPrestige.SetActive(!1).SetItem(Copper).AddRequirements(Achievement[5] = [CopperPrestigeStoneReq, CopperPrestigeLumberReq, CopperPrestigePopulationReq, CopperPrestigeTitBarReq, CopperPrestigeCoinsReq, CopperPrestigeDiamondsReq]).AddRewards(Upgrade[3] = [CopperPrestigeValueUpgrade, CopperPrestigeClickingUpgrade, CopperPrestigeProcessorUpgrade]));
            a.RegisterItem(IronPrestige = IronPrestige.SetActive(!1).SetItem(Iron).AddRequirements(Achievement[5] = [IronPrestigeStoneReq, IronPrestigeLumberReq,
                IronPrestigePopulationReq, IronPrestigeTitBarReq, IronPrestigeCoinsReq, IronPrestigeDiamondsReq
            ]).AddRewards(Upgrade[3] = [IronPrestigeMachineUpgrade, IronPrestigeProcessorUpgrade, IronPrestigeOilUpgrade]));
            a.RegisterItem(SilverPrestige = SilverPrestige.SetActive(!1).SetItem(Silver).AddRequirements(Achievement[5] = [SilverPrestigeStoneReq, SilverPrestigeLumberReq, SilverPrestigePopulationReq, SilverPrestigeTitBarReq, SilverPrestigeCoinsReq, SilverPrestigeDiamondsReq]).AddRewards(Upgrade[3] = [SilverPrestigeLumberjackUpgrade,
                SilverPrestigeProcessorUpgrade, SilverPrestigeValueUpgrade
            ]));
            a.RegisterItem(GoldPrestige = GoldPrestige.SetActive(!1).SetItem(Gold).AddRequirements(Achievement[5] = [GoldPrestigeStoneReq, GoldPrestigeLumberReq, GoldPrestigePopulationReq, GoldPrestigeTitBarReq, GoldPrestigeCoinsReq, GoldPrestigeDiamondsReq]).AddRewards(Upgrade[3] = [GoldPrestigeClickUpgrade, GoldPrestigeProcessorUpgrade, GoldPrestigeValueUpgrade]));
            game && PrestigeTab.ui.draw()
        };
        b.prototype.InitializeTabSystem = function(a) {
            a.reset();
            a.registerItem(InventoryTab);
            a.registerItem(EquipmentTab);
            a.registerItem(StatisticsTab);
            a.registerItem(StoreTab);
            a.registerItem(CraftingTab);
            a.registerItem(AchievementsTab);
            a.registerItem(PrestigeTab);
            a.registerItem(CityTab)
        };
        b.prototype.InitializeCitySystem = function(a) {
            a.Reset();
            a.RegisterEmployee(Builder = Builder.setName("Construction Worker").setBaseQuantity(1).setMaxQuantity(25).setPrice(5E6));
            a.RegisterEmployee(Scholar = Scholar.setName("Scholar").setBaseQuantity(1).setMaxQuantity(5).setPrice(2E7));
            a.RegisterResearch(BionicEyesResearch =
                BionicEyesResearch.setEmployee(Scholar).setUpgrade(BionicEyes).setDuration(12E3).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Coins, 2E7)).AddInput(new ItemQuantityPair(Steel_bar, 100)).AddInput(new ItemQuantityPair(Diamond, 10))));
            a.RegisterResearch(EnvironmentalResearch = EnvironmentalResearch.setEmployee(Scholar).setUpgrade(Environmental).setDuration(42E3).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Coins, 5E7)).AddInput(new ItemQuantityPair(Stone, 25E4))));
            a.RegisterResearch(XrayDrillsResearch =
                XrayDrillsResearch.setEmployee(Scholar).setUpgrade(XrayDrills).setDuration(16E3).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Coins, 25E6)).AddInput(new ItemQuantityPair(Iron_bar, 100))));
            a.RegisterResearch(PrecisionCrushersResearch = PrecisionCrushersResearch.setEmployee(Scholar).setUpgrade(PrecisionCrushers).setDuration(2E4).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Coins, 3E6)).AddInput(new ItemQuantityPair(Iron_bar, 250))));
            a.RegisterResearch(SelfLubeResearch = SelfLubeResearch.setEmployee(Scholar).setDuration(26E3).setUpgrade(SelfLubrication).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Coins,
                5E7)).AddInput(new ItemQuantityPair(Oil, 25E4))));
            a.RegisterBuilding(HouseT1 = HouseT1.setName("Shack").setEmployee(Builder).setPopulation(2).setMaxProgress(60).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs, 1E3))));
            a.RegisterBuilding(HouseT2 = HouseT2.setName("House").setEmployee(Builder).setPopulation(5).setMaxProgress(140).setRequires(HouseT1).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs, 2500))));
            a.RegisterBuilding(HouseT3 = HouseT3.setName("Duplex").setEmployee(Builder).setPopulation(15).setMaxProgress(300).setRequires(HouseT2).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs,
                5E3)).AddInput(new ItemQuantityPair(Stone, 1E3))));
            a.RegisterBuilding(HouseT4 = HouseT4.setName("Apartment").setEmployee(Builder).setPopulation(50).setMaxProgress(600).setRequires(HouseT3).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs, 1E4)).AddInput(new ItemQuantityPair(Stone, 2500))));
            a.RegisterBuilding(HouseT5 = HouseT5.setName("Hotel").setEmployee(Builder).setPopulation(200).setMaxProgress(1500).setRequires(HouseT4).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs, 15E3)).AddInput(new ItemQuantityPair(Stone,
                5E3))));
            a.RegisterBuilding(University = University.setName("University").setEmployee(Builder).setMaxProgress(6E4).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs, 25E3)).AddInput(new ItemQuantityPair(Stone, 1E4)).AddInput(new ItemQuantityPair(Steel_bar, 100))));
            a.RegisterBuilding(Gas_Station = Gas_Station.setName("Gas Station").setEmployee(Builder).setMaxProgress(25E3).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs, 1E4)).AddInput(new ItemQuantityPair(Stone, 2500)).AddInput(new ItemQuantityPair(Steel_bar,
                50))));
            a.RegisterBuilding(MiningCamp = MiningCamp.setName("Mining Camp").setEmployee(Builder).setMaxProgress(45E3).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Stone, 25E4)).AddInput(new ItemQuantityPair(Logs, 1E5))));
            a.RegisterBuilding(LoggingCamp = LoggingCamp.setName("Logging Camp").setEmployee(Builder).setMaxProgress(65E3).setRecipe((new Recipe).AddInput(new ItemQuantityPair(Logs, 25E4)).AddInput(new ItemQuantityPair(Steel_bar, 25))))
        };
        b.prototype.InitializeStoreSystem = function(a) {
            a.reset();
            a.registerItem(GasStationStore =
                GasStationStore.setSellTime(15E3).setPopulationBonus(500).setRequirement(Gas_Station).setAmountSold(25).addStock(Item[1] = [Oil]))
        };
        b.prototype.initializeData = function() {
            this.hardReset()
        };
        b.prototype.softReset = function() {
            this.InitializeItemSystem(this.itemSystem);
            this.InitializeUpgradeSystem(this.upgradeSystem);
            this.InitializeGathererSystem(this.gathererSystem);
            this.InitializeProcessorSystem(this.processorSystem);
            this.InitializeBuffSystem(this.buffSystem);
            this.InitializeTabSystem(this.tabSystem);
            this.InitializeCitySystem(this.citySystem);
            this.InitializeStoreSystem(this.storeSystem)
        };
        b.prototype.hardReset = function() {
            this.softReset();
            this.InitializeStatisticSystem(this.statisticSystem);
            this.InitializeAchievementSystem(this.achievementSystem);
            this.InitializePrestigeSystem(this.prestigeSystem)
        };
        b.prototype.save = function() {
            var a = [],
                f = [],
                e = [],
                b = [],
                c = [],
                g = [],
                h = [],
                k = [],
                l = [],
                m = [],
                n = [],
                q = [],
                s = [],
                r = [],
                t, v, p;
            for (p = 0; p < this.itemSystem.items.length; ++p) {
                var u = this.itemSystem.items[p];
                a.push(new ItemSave(u.Quantity, u.Alltime))
            }
            if (game)
                for (p = 0; p <
                    this.itemSystem.items.length; ++p) u = this.itemSystem.items[p], u.DisplayInInventory && (game.inventoryUI.itemSellIsChecked(p) ? f.push(new InventoryConfigSave(p, !0)) : f.push(new InventoryConfigSave(p, !1)));
            for (p = 0; p < this.gathererSystem.items.length; ++p) e.push(new GathererSave(this.gathererSystem.items[p].Quantity));
            for (p = 0; p < this.upgradeSystem.items.length; ++p) b.push(new UpgradeSave(this.upgradeSystem.items[p].Active));
            for (p = 0; p < this.processorSystem.items.length; ++p) u = this.processorSystem.items[p], c.push(new ProcessorSave(u.GetRecipeIndex(),
                u.ActiveJobs, u.ActiveProgress, u.Progress));
            for (p = 0; p < this.buffSystem.items.length; ++p) g.push(new BuffSave(this.buffSystem.items[p].RemainingTime));
            for (p = 0; p < this.statisticSystem.items.length; ++p) h.push(new StatisticSave(this.statisticSystem.items[p].Value));
            for (p = 0; p < this.achievementSystem.items.length; ++p) k.push(new AchievementSave(this.achievementSystem.items[p].Completed));
            for (p = 0; p < this.prestigeSystem.items.length; ++p) l.push(new PrestigeSave(this.prestigeSystem.items[p].Active));
            for (p = 0; p < this.citySystem.buildings.length; ++p) m.push(new BuildingSave(this.citySystem.buildings[p].quantity));
            for (p = 0; p < this.citySystem.employees.length; ++p) n.push(new EmployeeSave(this.citySystem.employees[p].quantity));
            this.citySystem.ongoingConstruction && (q.push(new ConstructionQueueSave(this.citySystem.ongoingConstruction.building.id)), t = this.citySystem.ongoingConstruction.progress);
            for (p = 0; p < this.citySystem.constructionQueue.length; ++p) q.push(new ConstructionQueueSave(this.citySystem.constructionQueue[p].building.id));
            this.citySystem.ongoingResearch && (s.push(new ResearchQueueSave(this.citySystem.ongoingResearch.research.id)),
                v = this.citySystem.ongoingResearch.progress);
            for (p = 0; p < this.citySystem.researchQueue.length; ++p) s.push(new ResearchQueueSave(this.citySystem.researchQueue[p].research.id));
            for (p = 0; p < this.storeSystem.items.length; ++p) r.push(this.storeSystem.items[p].open);
            localStorage.setItem("save", LZString.compressToBase64(JSON.stringify({
                Items: a,
                Gatherers: e,
                Upgrades: b,
                InventoryConfig: f,
                Processors: c,
                Buffs: g,
                Stats: h,
                Achievements: k,
                Prestiges: l,
                Buildings: m,
                Employees: n,
                ConstructionQueue: q,
                ResearchQueue: s,
                Stores: r,
                ConstructionTime: t,
                ResearchTime: v
            })));
            a = msg.create();
            a.type = 2;
            a.text = "Game saved.";
            a.timeout = 3;
            a.send()
        };
        b.prototype.load = function() {
            if (null !== localStorage.getItem("save")) {
                var a;
                try {
                    var f = LZString.decompressFromBase64(localStorage.getItem("save"));
                    a = JSON.parse(f)
                } catch (e) {
                    console.log(e + ": Looks like you're transfering to the new save format. This error should not occur again."), a = JSON.parse(localStorage.getItem("save"))
                }
                if (a.Items)
                    for (f = 0; f < a.Items.length; ++f) {
                        var b = a.Items[f];
                        b.Quantity && (this.itemSystem.items[f].Quantity =
                            b.Quantity);
                        b.Alltime && (this.itemSystem.items[f].Alltime = b.Alltime)
                    }
                if (a.InventoryConfig)
                    for (f = 0; f < a.InventoryConfig.length; ++f) this.invconfigsave.push(a.InventoryConfig[f]);
                if (a.Gatherers)
                    for (f = 0; f < a.Gatherers.length; ++f) b = a.Gatherers[f], b.Quantity && (this.gathererSystem.items[f].Quantity = b.Quantity), this.gathererSystem.items[f].CalculateMiningStuff();
                if (a.Upgrades)
                    for (f = 0; f < a.Upgrades.length; ++f) b = a.Upgrades[f], b.Active && (this.upgradeSystem.items[f].Active = b.Active);
                if (a.Processors)
                    for (f = 0; f < a.Processors.length; ++f)
                        if (a.Processors[f]) {
                            var b =
                                a.Processors[f],
                                c = this.processorSystem.items[f];
                            c.ActiveJobs = b.ActiveJobs;
                            c.Jobs = b.ActiveJobs;
                            c.ActiveRecipe = c.Recipes[b.ActiveRecipeInt];
                            c.ActiveProgress = b.ActiveProgress;
                            c.Progress = b.Progress
                        }
                if (a.Buffs)
                    for (f = 0; f < a.Buffs.length; ++f) a.Buffs[f] && (this.buffSystem.items[f].RemainingTime = a.Buffs[f].RemainingTime);
                if (a.Stats)
                    for (f = 0; f < a.Stats.length; ++f) a.Stats[f] && (this.statisticSystem.items[f].Value = a.Stats[f].Value);
                if (a.Achievements)
                    for (f = 0; f < a.Achievements.length; ++f) a.Achievements[f] && (this.achievementSystem.items[f].Completed =
                        a.Achievements[f].Completed);
                if (a.Prestiges)
                    for (f = 0; f < a.Prestiges.length; ++f) a.Prestiges[f] && (this.prestigeSystem.items[f].Active = a.Prestiges[f].Active);
                if (a.Buildings)
                    for (f = 0; f < a.Buildings.length; ++f) a.Buildings[f] && (this.citySystem.buildings[f].quantity = a.Buildings[f].Quantity);
                if (a.Employees)
                    for (f = 0; f < a.Employees.length; ++f) a.Employees[f] && (this.citySystem.employees[f].quantity = a.Employees[f].Quantity);
                if (a.ConstructionQueue)
                    for (f = 0; f < a.ConstructionQueue.length; ++f) 0 === f ? (this.citySystem.ongoingConstruction =
                        new ConstructionProject(this.citySystem.buildings[a.ConstructionQueue[0].ID]), a.ConstructionTime && (this.citySystem.ongoingConstruction.progress = a.ConstructionTime)) : this.citySystem.freeBuilding(a.ConstructionQueue[f].ID);
                if (a.ResearchQueue)
                    for (f = 0; f < a.ResearchQueue.length; ++f) 0 === f ? (this.citySystem.ongoingResearch = new ResearchProject(this.citySystem.researches[a.ResearchQueue[0].ID]), a.ResearchTime && (this.citySystem.ongoingResearch.progress = a.ResearchTime)) : this.citySystem.freeResearch(a.ResearchQueue[f].ID);
                if (a.Stores)
                    for (f = 0; f < a.Stores.length; ++f) this.storeSystem.items[f].open = a.Stores[f]
            } else this.save()
        };
        return b
    }(),
    ResearchQueueSave = function() {
        return function(b) {
            this.ID = b
        }
    }(),
    ConstructionQueueSave = function() {
        return function(b) {
            this.ID = b
        }
    }(),
    EmployeeSave = function() {
        return function(b) {
            this.Quantity = b
        }
    }(),
    BuildingSave = function() {
        return function(b) {
            this.Quantity = b
        }
    }(),
    PrestigeSave = function() {
        return function(b) {
            this.Active = b
        }
    }(),
    ProcessorSave = function() {
        return function(b, a, f, e) {
            this.ActiveRecipeInt =
                b;
            this.ActiveJobs = a;
            this.ActiveProgress = f;
            this.Progress = e
        }
    }(),
    BuffSave = function() {
        return function(b) {
            this.RemainingTime = b
        }
    }(),
    InventoryConfigSave = function() {
        return function(b, a) {
            this.ID = b;
            this.Checked = a
        }
    }(),
    ItemSave = function() {
        return function(b, a) {
            this.Quantity = b;
            this.Alltime = a
        }
    }(),
    GathererSave = function() {
        return function(b) {
            this.Quantity = b
        }
    }(),
    UpgradeSave = function() {
        return function(b) {
            this.Active = b
        }
    }(),
    StatisticSave = function() {
        return function(b) {
            this.Value = b
        }
    }(),
    AchievementSave = function() {
        return function(b) {
            this.Completed =
                b
        }
    }(),
    UI = function() {
        function b() {}
        b.prototype.draw = function() {};
        b.prototype.update = function() {};
        return b
    }(),
    MenuBox = function() {
        function b() {}
        b.prototype.buildButton = function() {
            var a, f, e;
            a = document.createElement("button");
            "" !== this.color && "undefined" !== this.color && a.setAttribute("style", "background-color:" + this.color);
            a.setAttribute("class", "item");
            this.header ? (e = document.createElement("span"), e.textContent = this.header) : e = this.headerElement;
            "" !== this.headerId && "undefined" !== this.headerId && e.setAttribute("id",
                this.headerId);
            e.setAttribute("class", "itemheader");
            f = document.createElement("div");
            f.classList.add(this.image);
            var b = document.createElement("div");
            b.setAttribute("class", "itemimage");
            b.appendChild(f);
            f = document.createElement("span");
            "" !== this.footerId && "undefined" !== this.footerId && f.setAttribute("id", this.footerId);
            f.setAttribute("class", "itemfooter");
            f.textContent = this.footer;
            a.appendChild(e);
            a.appendChild(b);
            a.appendChild(f);
            return a
        };
        return b
    }(),
    ItemQuantityPair = function() {
        function b(a, f) {
            this.totalCount = !1;
            this.css = !0;
            this.item = a;
            this.quantity = f
        }
        b.prototype.sizePrefix = function(a) {
            this.prefix = a;
            return this
        };
        b.prototype.noCSS = function() {
            this.css = !1;
            return this
        };
        b.prototype.addTotalCount = function() {
            this.totalCount = !0;
            return this
        };
        b.prototype.display = function(a) {
            var f, e;
            f = document.createElement("div");
            this.css && f.setAttribute("class", "itemquantitycontainer");
            e = document.createElement("span");
            e.setAttribute("id", a);
            this.css && e.setAttribute("class", "itemquantityvalue");
            a = document.createElement("img");
            a.setAttribute("src",
                "Images/hack.png");
            a.classList.add((this.prefix ? this.prefix : "") + this.item.Name.replace(" ", "_"));
            this.css && a.classList.add("itemquantityimg");
            f.appendChild(a);
            f.appendChild(e);
            e.textContent = formatNumber(this.quantity) + (this.totalCount ? " (" + formatNumber(Math.floor(this.item.Quantity)) + ")" : "");
            return f
        };
        return b
    }(),
    ItemStringPair = function() {
        function b(a, f) {
            this.item = a;
            this.txt = f
        }
        b.prototype.display = function(a) {
            var f, e;
            f = document.createElement("div");
            f.setAttribute("class", "itemtextcontainer");
            e = document.createElement("span");
            e.setAttribute("id", a);
            e.setAttribute("class", "itemtextvalue");
            a = document.createElement("img");
            a.setAttribute("src", "/Images/hack.png");
            a.setAttribute("class", "itemquantityimg " + this.item.Name.replace(" ", "_"));
            f.appendChild(a);
            f.appendChild(e);
            e.textContent = this.txt;
            return f
        };
        return b
    }(),
    ImgQuantityPair = function() {
        return function(b, a) {
            this.img = b;
            this.quantity = a
        }
    }();

function animationEndRemover(b, a) {
    for (var f = ["webkitAnimationEnd", "animationend", "oanimationend", "MSAnimationEnd"], e = 0; e < f.length; e++) document.getElementById(b).addEventListener(f[e], function(f) {
        f.target.classList.remove(a)
    }, !1)
}

function createButton(b, a) {
    var f, e;
    f = document.createElement("div");
    e = document.createElement("div");
    e.textContent = b;
    a && (e.id = a);
    f.classList.add("button");
    f.appendChild(e);
    return f
}

function elementIndex(b) {
    for (var a = 0; null !== (b = b.previousSibling);) ++a;
    return a
}

function shiftElement(b, a) {
    if (0 < a)
        for (var f = 0; f < a; ++f) b.parentNode.insertBefore(b, b);
    else if (0 > a)
        for (f = 0; f > a; --f) b.nextSibling ? b.parentNode.insertBefore(b, b.nextSibling) : b.parentNode.appendChild(b)
}
var __extends = this.__extends || function(b, a) {
        function f() {
            this.constructor = b
        }
        for (var e in a) a.hasOwnProperty(e) && (b[e] = a[e]);
        f.prototype = a.prototype;
        b.prototype = new f
    },
    InventoryUI = function(b) {
        function a(a, e, d) {
            b.call(this);
            this.savedDisplayConfig = [];
            this.sortedItems = [];
            this.displayConfig = !1;
            this.itemSystem = a.itemSystem;
            this.inventory = a;
            this.buffSystem = e;
            this.gathererSystem = d;
            this.draw()
        }
        __extends(a, b);
        a.prototype.itemSellIsChecked = function(a) {
            return document.getElementById("configchecker" + a).checked ?
                !0 : !1
        };
        a.prototype.sortItems = function() {
            this.sortedItems = this.sortedItems.concat(this.itemSystem.items);
            this.sortedItems.sort(function(a, e) {
                return a.Type < e.Type ? -1 : a.Type > e.Type ? 1 : a.Value < e.Value ? -1 : a.Value > e.Value ? 1 : 0
            })
        };
        a.prototype.draw = function() {
            for (; document.getElementById("tabs-Inventory").firstChild;) document.getElementById("tabs-Inventory").removeChild(document.getElementById("tabs-Inventory").firstChild);
            this.drawSidebar();
            this.drawHeader();
            this.drawSellAll();
            var a = document.createElement("div");
            a.setAttribute("class", "inventory");
            a.setAttribute("id", "inventory");
            var e = document.createElement("div");
            e.setAttribute("class", "configpanel");
            e.setAttribute("id", "configpanel");
            a.appendChild(e);
            document.getElementById("tabs-Inventory").appendChild(a);
            this.sortItems();
            for (e = 0; e < this.sortedItems.length; ++e) {
                var b, c = this.sortedItems[e];
                b = new MenuBox;
                b.headerElement = (new ItemQuantityPair(Coins, c.Value)).sizePrefix("Third-").display(c.Name + "header");
                b.footer = formatNumber(c.Quantity);
                b.footerId = c.Name +
                    "footer";
                b.image = c.Name.replace(" ", "_");
                b.color = ItemColor[c.Rarity];
                b = b.buildButton();
                b.setAttribute("id", "item" + c.ID.toString());
                b.addEventListener("click", function(a) {
                    game.inventory.selectItem(a);
                    game.inventoryUI.update()
                }, !1);
                a.appendChild(b);
                tooltip.create(b, c.Name)
            }
            this.drawConfigPanel()
        };
        a.prototype.resetConfigPanel = function() {
            for (var a = document.getElementById("configpanel").getElementsByTagName("input"), e = 0; e < a.length; ++e) {
                var b = a[e];
                "checkbox" === b.type && (b.checked = !1)
            }
        };
        a.prototype.drawConfigPanel =
            function() {
                var a, e, b = ["Potion", "Crafting", "Ingredient", "Gem", "Ore"];
                e = document.createElement("table");
                a = document.getElementById("configpanel");
                e.setAttribute("id", "configtable");
                e.setAttribute("class", "configtable");
                a.appendChild(e);
                e = document.getElementById("configtable");
                for (var c = e.createTHead().insertRow(0), g = 0; g < b.length; ++g) {
                    var h = c.insertCell(0);
                    h.setAttribute("class", "configtableitem");
                    h.textContent = b[g];
                    var k = c.insertCell(0);
                    k.setAttribute("class", "configtablecheck");
                    var l = document.createElement("input");
                    l.setAttribute("type", "checkbox");
                    l.setAttribute("name", "configselect" + ItemType[b.length - 1 - g]);
                    l.addEventListener("change", function(a) {
                        game.inventory.toggleBoxes(a)
                    }, !1);
                    k.appendChild(l)
                }
                for (var b = [], g = [], m = [], n = [], q = [], s = 0, c = 0; c < this.itemSystem.items.length; ++c) {
                    var r = this.itemSystem.items[c];
                    switch (r.Type) {
                        case 4:
                            b.push(r);
                            b.length > s && (s = b.length);
                            break;
                        case 3:
                            g.push(r);
                            g.length > s && (s = g.length);
                            break;
                        case 2:
                            m.push(r);
                            m.length > s && (s = m.length);
                            break;
                        case 1:
                            n.push(r);
                            n.length > s && (s = n.length);
                            break;
                        case 0:
                            q.push(r), q.length > s && (s = q.length)
                    }
                }
                e = e.createTBody();
                for (r = 0; r < s; ++r) c = e.insertRow(), this.drawConfigHelper(b, h, k, l, c, r), this.drawConfigHelper(g, h, k, l, c, r), this.drawConfigHelper(m, h, k, l, c, r), this.drawConfigHelper(n, h, k, l, c, r), this.drawConfigHelper(q, h, k, l, c, r);
                h = createButton("Check All");
                tooltip.create(h, "Checks all items including undiscovered ones!");
                h.addEventListener("click", function() {
                    game.inventory.checkAll()
                }, !1);
                a.appendChild(h)
            };
        a.prototype.drawConfigHelper = function(a, e, b, c, g, h) {
            e =
                g.insertCell(0);
            b = g.insertCell(0);
            c = document.createElement("input");
            c.setAttribute("type", "checkbox");
            if (h <= a.length - 1) {
                e.setAttribute("class", "configtableitem");
                e.setAttribute("id", "configitem" + a[h].ID.toString());
                e.appendChild((new ItemStringPair(a[h], a[h].Name.toString())).display("configcontent" + a[h].ID.toString()));
                b.setAttribute("class", "configtablecheck");
                b.setAttribute("id", "configcheck" + a[h].ID.toString());
                c.setAttribute("id", "configchecker" + a[h].ID.toString());
                c.setAttribute("name", "configselect" +
                    ItemType[a[0].Type]);
                for (e = 0; e < data.invconfigsave.length; ++e) data.invconfigsave[e].ID === a[h].ID && data.invconfigsave[e].Checked && c.setAttribute("checked", "true");
                b.appendChild(c)
            } else e.setAttribute("class", "configtableitemempty"), b.setAttribute("class", "configtablecheckempty")
        };
        a.prototype.updateConfigPanel = function() {
            for (var a, e, b, c = 0; c < this.itemSystem.items.length; ++c) {
                var g = this.itemSystem.items[c];
                g.DisplayInInventory && (a = document.getElementById("configitem" + g.ID), b = document.getElementById("configcontent" +
                    g.ID), e = document.getElementById("configchecker" + g.ID), 0 !== g.Alltime ? (a.firstChild.firstChild.src = "/Images/hack.png", a.firstChild.firstChild.setAttribute("class", "Third-" + g.Name.replace(" ", "_")), e.style.visibility = "visible", b.textContent = g.Name) : (a.firstChild.firstChild.setAttribute("class", "Unknown"), e.style.visibility = "hidden", b.textContent = "Not discovered"))
            }
        };
        a.prototype.update = function() {
            this.updateSidebar();
            this.updateHeader();
            this.updateConfigPanel();
            for (var a = 0; a < this.sortedItems.length; ++a) {
                var e,
                    b, c = this.itemSystem.LookupItem(this.sortedItems[a].ID);
                e = document.getElementById("item" + c.ID.toString());
                b = document.getElementById(c.Name + "footer");
                b.textContent = formatNumber(c.Quantity);
                b = document.getElementById(c.Name + "header");
                b.textContent = formatNumber(c.GetValue());
                e.style.display = c.DisplayInInventory ? 0 === c.Quantity ? "none" : "inline" : "none"
            }
        };
        a.prototype.updateHeader = function() {
            var a, e, b, c;
            a = document.getElementById("configpanel");
            b = document.getElementById("drinkoption");
            e = document.getElementById("selecteditem");
            c = document.getElementById("selecteditemimg");
            a.style.display = this.displayConfig ? "block" : "none";
            this.inventory.selectedItem ? (e.style.display = "block", c.setAttribute("src", "/Images/hack.png"), c.setAttribute("class", "inventoryheaderimg " + this.inventory.selectedItem.Name.replace(" ", "_")), b.style.display = 4 === this.inventory.selectedItem.Type ? "inline" : "none") : e.style.display = "none"
        };
        a.prototype.updateSidebar = function() {
            var a = Oil.Quantity,
                e = StatOilConsumed.Value,
                b = Pumpjack.minePerTick + BigTexan.minePerTick,
                a = a - e,
                a = 0 > a ? 0 : a,
                c = b - StatOilConsumed.Value,
                c = c - (Gas_Station.Active ? GasStationStore.saleAmount / (GasStationStore.sellTime / 1E3) : 0);
            document.getElementById("sidebarcoins").textContent = formatNumber(Coins.Quantity);
            document.getElementById("sidebaroil").textContent = formatNumber(Math.floor(a));
            document.getElementById("oillossgain").textContent = c.toFixed(1);
            document.getElementById("oilloss").textContent = (e - GasStationStore.saleAmount / (GasStationStore.sellTime / 1E3)).toFixed(0).toString();
            document.getElementById("oilgain").textContent =
                b.toFixed(0).toString();
            for (a = 0; a < this.gathererSystem.items.length; ++a) e = this.gathererSystem.items[a], b = document.getElementById("oilconsumed" + a), c = document.getElementById("oilconsumedvalue" + a), e.GuaranteedOre[0] ? e.GuaranteedOre[0] === Oil ? (b.style.display = 0 < e.minePerTick ? "block" : "none", c.textContent = e.minePerTick.toFixed(1).toString()) : b.style.display = "none" : (b.style.display = 0 < e.fuelTank ? "block" : "none", c.textContent = e.fuelTank.toFixed(1).toString());
            e = !1;
            for (a = 0; a < this.buffSystem.items.length; ++a) {
                var b =
                    this.buffSystem.items[a],
                    c = document.getElementById("buffcont" + b.ID),
                    g = document.getElementById("bufftimer" + b.ID),
                    h = Math.ceil(b.RemainingTime);
                g.textContent = "(" + Math.floor(h / 60) + ":" + (10 > h % 60 ? "0" : "") + h % 60 + ")";
                0 === b.RemainingTime ? c.style.display = "none" : (c.style.display = "inline-block", e = !0);
                e ? document.getElementById("buffscontainer").style.display = "block" : document.getElementById("buffscontainer").style.display = "none"
            }
            document.getElementById("gasstationoil").style.display = Gas_Station.Active ? "block" : "none";
            document.getElementById("gasstationoilconsumed").textContent = formatNumber(GasStationStore.saleAmount / (GasStationStore.sellTime / 1E3))
        };
        a.prototype.drawSidebar = function() {
            var a = document.getElementById("sidebar"),
                e = document.createElement("div"),
                b = document.getElementById("header-stats");
            e.setAttribute("class", "sidebarinventory");
            e.setAttribute("id", "sidebarinventory");
            var c = document.createElement("span");
            c.classList.add("oilGain");
            c.id = "oilgain";
            var g = document.createElement("span");
            g.id = "oilloss";
            g.classList.add("oilLoss");
            for (var h = document.createElement("div"), k = 0; k < this.gathererSystem.items.length; ++k) {
                var l = this.gathererSystem.items[k],
                    m = document.createElement("div");
                m.id = "oilconsumed" + k;
                var n = document.createElement("span"),
                    q = document.createElement("span");
                q.id = "oilconsumedvalue" + k;
                n.textContent = l.Name + ": ";
                l.GuaranteedOre[0] ? l.GuaranteedOre[0] === Oil && (q.style.color = "green") : q.style.color = "red";
                m.appendChild(n);
                m.appendChild(q);
                h.appendChild(m)
            }
            m = document.createElement("div");
            m.id = "gasstationoil";
            n = document.createElement("span");
            n.textContent = "Gas Station: ";
            q = document.createElement("span");
            q.id = "gasstationoilconsumed";
            q.style.color = "red";
            m.appendChild(n);
            m.appendChild(q);
            h.appendChild(m);
            l = document.createElement("span");
            k = (new ItemQuantityPair(Oil, Oil.Quantity)).sizePrefix("Half-").noCSS().display("sidebaroil");
            l.id = "oillossgain";
            l.classList.add("oilGainLoss");
            h.classList.add("oilTable");
            k.appendChild(h);
            k.appendChild(l);
            k.appendChild(c);
            k.appendChild(g);
            k.style.maxHeight = "42px;";
            k.firstChild.classList.add("headeritem");
            a.appendChild(e);
            a = (new ItemQuantityPair(Coins, Coins.Quantity)).sizePrefix("Half-").noCSS().display("sidebarcoins");
            a.style.maxHeight = "42px";
            a.firstChild.classList.add("headeritem");
            b.appendChild(a);
            b.appendChild(k);
            b = document.createElement("div");
            b.setAttribute("class", "sidebarinventory");
            b.id = "buffscontainer";
            b.style.textAlign = "center";
            b.style.verticalAlign = "top";
            b.style.display = "block";
            k = document.createElement("div");
            k.textContent = "Buffs";
            b.appendChild(k);
            e.appendChild(b);
            for (k = 0; k < this.buffSystem.items.length; ++k) e =
                this.buffSystem.items[k], a = document.createElement("div"), a.style.display = "inline-block", a.style.background = "linear-gradient(rgb(4, 32, 55), rgb(18, 54, 82))", a.style.width = "45%", a.style.margin = "2%", a.style.height = "100px", a.style.border = "solid 1px", a.style.textAlign = "center", tooltip.create(a, e.Upgrade.GetTooltip()), a.style.position = "relative", a.id = "buffcont" + e.ID, c = document.createElement("span"), c.style.position = "absolute", c.style.top = "0", c.style.right = "0", c.style.width = "100%", c.textContent = e.Upgrade.Name,
                g = document.createElement("img"), g.src = "/Images/hack.png", g.classList.add("Third-" + e.Item.Name.replace(" ", "_")), g.style.marginTop = "35%", h = document.createElement("span"), h.style.position = "absolute", h.style.bottom = "0", h.style.right = "0", h.style.width = "100%", h.id = "bufftimer" + e.ID, a.appendChild(h), a.appendChild(g), a.appendChild(c), b.appendChild(a);
            document.getElementById("rock").addEventListener("click", function() {
                Player.ManualMine();
                StatRockClicked.Value++;
                clickTracking(initialClicks, StatRockClicked.Value);
                game.inventoryUI.update()
            }, !1)
        };
        a.prototype.drawSellAll = function() {
            var a = document.createElement("div"),
                e = document.createElement("div");
            e.classList.add("paired-buttons");
            var b = createButton("Sell (...)"),
                c = createButton("..."),
                g = document.createElement("br");
            a.setAttribute("class", "sellallitems");
            b.addEventListener("click", function(a) {
                game.inventory.sellAll()
            }, !1);
            c.id = "configurationbutton";
            c.addEventListener("click", function(a) {
                game.inventoryUI.displayConfig = !game.inventoryUI.displayConfig;
                game.inventoryUI.update()
            }, !1);
            e.appendChild(b);
            e.appendChild(c);
            a.appendChild(e);
            document.getElementById("tabs-Inventory").appendChild(a);
            document.getElementById("tabs-Inventory").appendChild(g);
            animationEndRemover("configurationbutton", "no-items-sold")
        };
        a.prototype.drawHeader = function() {
            var a = document.createElement("div"),
                e = document.createElement("br"),
                b = document.createElement("img"),
                c = document.createElement("input"),
                g = document.createElement("span"),
                h = document.createElement("input"),
                k = document.createElement("input"),
                l = document.createElement("input");
            a.setAttribute("class", "inventoryheader");
            a.setAttribute("id", "selecteditem");
            b.setAttribute("class", "inventoryheaderimg");
            b.setAttribute("id", "selecteditemimg");
            c.setAttribute("type", "text");
            c.setAttribute("class", "inventoryheadercontrols");
            c.setAttribute("id", "itemquantity");
            h.setAttribute("type", "button");
            h.setAttribute("value", "Sell");
            h.setAttribute("class", "inventoryheadercontrols");
            h.addEventListener("click", function(a) {
                a = +document.getElementById("itemquantity").value;
                0 > a && (a = 0);
                game.inventory.sellItem(game.inventory.selectedItem.ID,
                    a);
                game.inventoryUI.update()
            }, !1);
            k.setAttribute("type", "button");
            k.setAttribute("value", "Drink");
            k.setAttribute("class", "inventoryheadercontrols");
            k.setAttribute("id", "drinkoption");
            k.addEventListener("click", function(a) {
                game.inventory.consumePotion()
            }, !1);
            l.setAttribute("type", "button");
            l.setAttribute("value", "Sell all");
            l.setAttribute("class", "inventoryheadercontrols");
            l.addEventListener("click", function(a) {
                game.inventory.sellItem(game.inventory.selectedItem.ID, game.inventory.selectedItem.Quantity);
                game.inventoryUI.update()
            }, !1);
            a.appendChild(b);
            a.appendChild(g);
            a.appendChild(l);
            a.appendChild(k);
            a.appendChild(h);
            a.appendChild(c);
            document.getElementById("tabs-Inventory").appendChild(a);
            document.getElementById("tabs-Inventory").appendChild(e)
        };
        return a
    }(UI),
    StoreCategory;
(function(b) {
    b[b.Mining = 0] = "Mining";
    b[b.Machines = 1] = "Machines";
    b[b.Gathering = 2] = "Gathering";
    b[b.Construction = 3] = "Construction";
    b[b.Processing = 4] = "Processing";
    b[b.Items = 5] = "Items"
})(StoreCategory || (StoreCategory = {}));
var StoreUI = function(b) {
        function a(a, e, d) {
            b.call(this);
            this.items = [];
            this.upgradeSystem = a;
            this.gathererSystem = e;
            this.itemSystem = d;
            this.draw()
        }
        __extends(a, b);
        a.prototype.draw = function() {
            var a = document.createElement("div"),
                e;
            for (e in StoreCategory) "number" === typeof StoreCategory[e] && a.appendChild(this.drawStoreCategory(e));
            a.setAttribute("class", "storecontainer");
            a.id = "storecontainer";
            document.getElementById("tabs-Store").appendChild(a)
        };
        a.prototype.drawStoreCategory = function(a) {
            var e = document.createElement("div"),
                b = document.createElement("div");
            e.setAttribute("class", "storecategory");
            b.setAttribute("class", "storecategoryheader");
            b.textContent = a;
            e.appendChild(b);
            for (var c in this.upgradeSystem.items) this.upgradeSystem.items[c].StoreCategory === StoreCategory[a] && e.appendChild(this.drawStoreItem(this.upgradeSystem, c, "Upgrade"));
            for (var g in this.gathererSystem.items) this.gathererSystem.items[g].StoreCategory === StoreCategory[a] && e.appendChild(this.drawStoreItem(this.gathererSystem, g, "Gatherer"));
            for (var h in this.itemSystem.items) b =
                this.itemSystem.items[h], b.StoreCategory === StoreCategory[a] && (this.items.push(b), e.appendChild(this.drawStoreItem(this.itemSystem, h, "Item")));
            return e
        };
        a.prototype.drawStoreItem = function(a, e, b) {
            var c = document.createElement("div"),
                g = document.createElement("div"),
                h = document.createElement("div"),
                k = document.createElement("div"),
                l = document.createElement("div");
            k.classList.add("itemimage");
            l.style.marginTop = "32px";
            l.classList.add(a.items[e].Name.split(" ").join("_"));
            (-1 < a.items[e].Name.indexOf("Furnace") ||
                -1 < a.items[e].Name.indexOf("Cauldron")) && l.setAttribute("class", "Half-" + a.items[e].Name);
            k.appendChild(l);
            c.appendChild(k);
            var m = document.createElement("div");
            m.classList.add("store-info-box");
            k = createButton("Buy");
            k.style.marginBottom = "5px";
            l = (new ItemQuantityPair(Coins, a.items[e].GetPrice())).sizePrefix("Third-").display(b + "cost" + e.toString());
            c.setAttribute("id", b + "item" + e.toString());
            c.setAttribute("class", "storeitemcontainer");
            g.setAttribute("class", "storeitemheader");
            g.setAttribute("id", b + "itemheader" +
                e);
            g.textContent = a.items[e].Name;
            h.setAttribute("class", "storeitemfooter");
            if ("Gatherer" === b) {
                a = document.createElement("div");
                var n = document.createElement("div");
                n.id = "efficiencytooltip" + e;
                var q = document.createElement("div");
                q.id = "gathererfueltooltip" + e;
                var s = document.createElement("div");
                s.id = "gathererprobtooltip" + e;
                var r = document.createElement("div");
                r.id = "oreticktooltip" + e;
                a.appendChild(n);
                a.appendChild(q);
                a.appendChild(s);
                a.appendChild(document.createElement("br"));
                a.appendChild(r);
                m.appendChild(a);
                c.appendChild(m);
                c.appendChild(m);
                k.addEventListener("click", function() {
                    game.gathererSystem.Purchase(e);
                    game.storeUI.update()
                }, !1)
            }
            "Upgrade" === b && (a = document.createElement("div"), a.textContent = this.upgradeSystem.items[e].GetTooltip(), m.appendChild(a), c.appendChild(m), k.addEventListener("click", function() {
                game.upgradeSystem.Purchase(e);
                game.storeUI.update()
            }, !1));
            "Item" === b && (this.items.push(this.itemSystem.items[e]), b = document.createElement("input"), b.setAttribute("type", "text"), b.setAttribute("id",
                "itemquantityselector" + e), b.style.width = "35px", b.onkeyup = function(a) {
                var f = a.target;
                a = +f.value;
                f = game.itemSystem.items[f.id.replace("itemquantityselector", "")];
                isNaN(a) || (document.getElementById("Itemcost" + f.ID).textContent = formatNumber(a * f.Price))
            }, k.addEventListener("click", function(a) {
                a = +document.getElementById("itemquantityselector" + e).value;
                isNaN(a) && (a = 0);
                0 > a && (a = 0);
                game.itemSystem.items[e].Price * a <= Coins.Quantity && (game.inventory.addManyItems(e, a), game.inventory.deductFunds(game.itemSystem.items[e].Price *
                    a))
            }), h.appendChild(b));
            h.appendChild(k);
            h.appendChild(l);
            c.appendChild(g);
            c.appendChild(h);
            return c
        };
        a.prototype.update = function() {
            for (var a in this.upgradeSystem.items) {
                var e = document.getElementById("Upgradeitem" + a),
                    b = this.upgradeSystem.items[a];
                0 === b.Type && (e.style.display = b.Active ? "none" : b.Requires ? b.Requires.Active ? "inline-block" : "none" : "inline-block")
            }
            for (var c in this.gathererSystem.items) {
                e = document.getElementById("Gathereritem" + c);
                b = document.getElementById("Gatherercost" + c);
                a = this.gathererSystem.items[c];
                document.getElementById("Gathereritemheader" + c).textContent = a.Name + " (" + a.Quantity + "/" + a.MaxOwned + ")";
                var g = !0;
                a.requires && (g = a.requires.Active);
                e.style.display = a.Quantity < a.MaxOwned && g ? "inline-block" : "none";
                b.textContent = formatNumber(a.GetPrice());
                document.getElementById("efficiencytooltip" + c).textContent = "Efficiency: +" + a.incrEfficiency;
                e = document.getElementById("gathererfueltooltip" + c);
                0 === a.incrFuelConsumed ? e.style.display = "none" : (e.textContent = "Fuel used: +" + a.incrFuelConsumed, e.style.display =
                    "block");
                document.getElementById("gathererprobtooltip" + c).textContent = "Rarity mod: +" + 100 * a.incrProbabilityModifier + "%";
                document.getElementById("oreticktooltip" + c).textContent = "Resource/tick: " + (a.incrEfficiency * a.Quantity * a.EfficiencyModifier).toFixed(2)
            }
            c = document.getElementById("storecontainer").getElementsByClassName("storecategory");
            for (a = 0; a < c.length; ++a) {
                e = c[a].childNodes;
                b = !0;
                for (g = 0; g < e.length; ++g)
                    if ("none" !== e[g].style.display && 0 !== g) {
                        b = !1;
                        break
                    }
                c[a].style.display = b ? "none" : "block"
            }
        };
        return a
    }(UI),
    ProcessorUI = function() {
        function b(a) {
            this.headers = ["Action", "Output", "Input", "Capacity", "Image"];
            this.headerWidths = ["10%", "30%", "20%", "20%", "20%"];
            this.id = a.ID;
            this.name = a.Name;
            this.recipes = a.Recipes;
            this.capacity = a.Capacity;
            this.processor = a
        }
        b.prototype.Display = function() {
            var a = document.createElement("div");
            a.setAttribute("class", "processorpane");
            a.setAttribute("id", "processorpanel" + this.id);
            var f = document.createElement("table");
            f.setAttribute("class", "processortable");
            var e = f.createTHead();
            e.style.height =
                "35px";
            var b = e.insertRow(0);
            b.classList.add("table-header");
            var c = b.insertCell(0);
            b.style.height = "35px";
            c.setAttribute("colspan", this.headers.length.toString());
            c.setAttribute("width", "100%");
            c.textContent = this.name;
            e = e.insertRow(1);
            e.classList.add("table-subheader");
            for (var g = 0; g < this.headers.length; ++g) b = e.insertCell(0), b.textContent = this.headers[g], b.setAttribute("width", this.headerWidths[g]);
            e = f.createTBody();
            c = e.insertRow(0);
            c.classList.add("table-row");
            b = c.insertCell(0);
            b.setAttribute("class",
                "progressbarcontainer");
            c.style.height = "35px";
            c = document.createElement("progress");
            g = document.createElement("div");
            c.setAttribute("id", "processorprog" + this.id.toString());
            c.setAttribute("max", "100");
            c.setAttribute("class", "progressbar");
            g.setAttribute("id", "processorprogtext" + this.id.toString());
            g.setAttribute("class", "progressbartext");
            b.setAttribute("colspan", this.headers.length.toString());
            b.appendChild(c);
            b.appendChild(g);
            var h = e.insertRow(1);
            h.classList.add("table-row");
            h.style.height = "150px";
            var e = h.insertCell(0),
                b = h.insertCell(0),
                c = h.insertCell(0),
                g = h.insertCell(0),
                h = h.insertCell(0),
                k = document.createElement("img");
            k.setAttribute("src", "/Images/hack.png");
            k.classList.add(this.name.replace(" ", "_"));
            h.appendChild(k);
            g.textContent = this.capacity.toString();
            g.setAttribute("id", "processorcapacity" + this.id);
            c.setAttribute("id", "processorrequirements" + this.id);
            c.setAttribute("class", "processorrequirements");
            for (g = h = 0; g < this.recipes.length; ++g) k = this.recipes[g].Recipe.inputs.length, k > h && (h = k);
            for (g = 0; g < h; ++g) k = (new ItemQuantityPair(Stone, 0)).sizePrefix("Half-").display("genericiqp"), k.id = "processor" + this.id + "recipe" + g, c.appendChild(k);
            h = document.createElement("input");
            h.setAttribute("type", "text");
            h.setAttribute("id", "processorrecipequantity" + this.id);
            h.style.width = "35px";
            h.setAttribute("value", this.processor.Jobs.toString());
            h.onkeyup = function(a) {
                a = a.target;
                var f = +a.value,
                    e = game.processorSystem.items[a.id.replace("processorrecipequantity", "")];
                isNaN(f) ? e.Jobs = 0 : (e.Jobs = f, f > e.Capacity &&
                    (a.value = e.Capacity, e.Jobs = e.Capacity));
                e.UI.update()
            };
            k = createButton("Max");
            k.id = "processorrecipemax" + this.id;
            k.onclick = function(a) {
                a = a.target.parentElement.id.replace("processorrecipemax", "");
                var f = game.processorSystem.items[a],
                    e = f.GetRecipeIndex();
                if (0 === f.ActiveJobs) {
                    for (var b = f.Capacity, e = f.Recipes[e].Recipe, c = 0; c < e.inputs.length; c++) {
                        var d = e.inputs[c],
                            d = Math.floor(d.item.Quantity / d.quantity);
                        d < b && (b = d)
                    }
                    document.getElementById("processorrecipequantity" + a).value = b.toString();
                    f.Jobs = b
                }
            };
            var l =
                document.createElement("select");
            l.setAttribute("id", "processorrecipeselect" + this.id);
            for (g = 0; g < this.recipes.length; ++g) {
                for (var m = document.createElement("option"), n = "", q = 0; q < this.recipes[g].Recipe.outputs.length; ++q) n = n.concat(this.recipes[g].Recipe.outputs[q].item.Name);
                m.textContent = n;
                l.appendChild(m);
                l.selectedIndex = this.processor.GetRecipeIndex()
            }
            l.onchange = function(a) {
                a = a.target;
                var f = game.processorSystem.items[a.id.replace("processorrecipeselect", "")];
                f.ActiveRecipe = f.Recipes[a.selectedIndex];
                f.Recipe = f.Recipes[a.selectedIndex];
                f.UI.update()
            };
            tooltip.create(c, "Recipe");
            b.appendChild(h);
            b.appendChild(k);
            b.appendChild(l);
            b = createButton("Deactivate", "processordeactivator" + this.id);
            tooltip.create(b, "Salvages half of the unused inputs.");
            b.addEventListener("click", function(a) {
                a = game.processorSystem.items[a.target.id.replace("processordeactivator", "")];
                a.Deactivate();
                a.UI.update()
            }, !1);
            c = createButton("Activate", "processoractivator" + this.id);
            c.addEventListener("click", function(a) {
                a = game.processorSystem.items[a.target.id.replace("processoractivator",
                    "")];
                a.Activate();
                a.UI.update()
            }, !1);
            e.appendChild(c);
            e.appendChild(b);
            a.appendChild(f);
            a.appendChild(document.createElement("br"));
            this.drawSidebar();
            return a
        };
        b.prototype.update = function() {
            var a = game.processorSystem.items[this.id],
                f = document.getElementById("processorcapacity" + this.id),
                e = document.getElementById("processorrequirements" + this.id),
                b = document.getElementById("processorpanel" + this.id),
                c = document.getElementById("processorprog" + this.id),
                g = document.getElementById("processorprogtext" + this.id),
                h = document.getElementById("processorrecipeselect" + this.id),
                k = document.getElementById("processorrecipequantity" + this.id),
                l = document.getElementById("processoractivator" + this.id),
                m = document.getElementById("processordeactivator" + this.id),
                n = document.getElementById("processoroverall" + this.id),
                q = document.getElementById("overprocessorprogress" + this.id),
                s = document.getElementById("processorprogress" + this.id),
                r = document.getElementById("processorstatuscon" + this.id),
                t = document.getElementById("processorstatus" +
                    this.id);
            a.ActiveRecipe && (n.textContent = a.ActiveProgress + "/" + a.ActiveJobs + " " + a.ActiveRecipe.Recipe.outputs[0].item.Name, q.max = a.MaxProgress, q.value = a.Progress, s.max = a.MaxProgress * a.ActiveJobs, s.value = a.Progress + a.MaxProgress * a.ActiveProgress);
            r.style.display = 0 < a.RemainingTime ? "block" : "none";
            t.textContent = formatTime(a.RemainingTime);
            b.style.display = a.Enabled ? "block" : "none";
            c.max = a.MaxProgress;
            c.value = a.Progress;
            f.textContent = a.Capacity.toString();
            f = a.Recipe.Recipe.inputs;
            b = document.createElement("div");
            for (c = 0; c < f.length; ++c) n = document.getElementById("processor" + this.id + "recipe" + c), q = document.createElement("div"), s = document.createElement("span"), r = document.createElement("div"), r.classList.add("crafting-tooltip"), r.textContent = formatNumber(Math.floor(f[c].item.Quantity)), q.appendChild(r), s.textContent = "/" + f[c].quantity * a.Jobs + " " + f[c].item.Name, q.appendChild(s), b.appendChild(q), n.children[0].src = "/Images/hack.png", n.children[0].setAttribute("class", "Half-" + f[c].item.Name.replace(" ", "_")), n.children[1].style.color =
                f[c].quantity * a.Jobs <= f[c].item.Quantity ? "darkgreen" : "darkred", n.children[1].textContent = formatNumber(Math.floor(f[c].quantity * a.Jobs));
            tooltip.complexModify(getDataset(e, "tooltip"), b);
            h.disabled = 0 < a.ActiveJobs ? !0 : !1;
            a.ActiveRecipe = a.Recipes[h.selectedIndex];
            a.Recipe = a.Recipes[h.selectedIndex];
            k.disabled = 0 < a.ActiveJobs ? !0 : !1;
            l.style.display = 0 < a.ActiveJobs ? "none" : "inline-block";
            m.style.display = 0 < a.ActiveJobs ? "inline-block" : "none";
            g.textContent = 0 < a.ActiveJobs ? "Manufacturing " + a.ActiveRecipe.Recipe.outputs[0].item.Name +
                " (" + a.ActiveProgress + "/" + a.ActiveJobs + ")" : ""
        };
        b.prototype.drawSidebar = function() {
            var a = document.getElementById("sidebar"),
                f = document.createElement("div");
            f.setAttribute("id", "processorstatuscon" + this.id);
            f.setAttribute("class", "sidebarinventory");
            f.style.position = "relative";
            f.style.border = "solid 1px";
            f.style.width = "94.75%";
            f.style.display = "none";
            f.style.background = "linear-gradient(rgb(4, 32, 55), rgb(18, 54, 82))";
            var e = document.createElement("div");
            e.style.position = "absolute";
            e.style.top = "0";
            e.style.right =
                "0";
            e.style.textAlign = "center";
            e.style.width = "100%";
            e.textContent = this.name;
            var b = document.createElement("div");
            b.style.position = "relative";
            b.style.width = "96%;";
            b.style.margin = "2%";
            b.style.marginTop = "25px";
            var c = document.createElement("div");
            c.style.position = "relative";
            c.style.width = "96%;";
            c.style.margin = "2%";
            var g = document.createElement("div");
            g.setAttribute("id", "processorstatus" + this.id);
            g.style.width = "100%";
            g.style.textAlign = "center";
            g.style.display = "inline-block";
            g.style.position = "absolute";
            g.style.top = "0";
            g.style.right = "0";
            g.style.zIndex = "11";
            var h = document.createElement("progress");
            h.id = "processorprogress" + this.id;
            h.style.width = "100%";
            h.style.top = "0";
            h.style.right = "0";
            h.style.zIndex = "10";
            h.setAttribute("class", "greenprog");
            var k = document.createElement("progress");
            k.id = "overprocessorprogress" + this.id;
            k.style.width = "100%";
            k.setAttribute("class", "greenprog");
            var l = document.createElement("div");
            l.setAttribute("id", "processoroverall" + this.id);
            l.style.width = "100%";
            l.style.textAlign = "center";
            l.style.display = "inline-block";
            l.style.position = "absolute";
            l.style.top = "0";
            l.style.right = "0";
            l.style.zIndex = "11";
            f.appendChild(e);
            b.appendChild(h);
            b.appendChild(g);
            c.appendChild(l);
            c.appendChild(k);
            f.appendChild(b);
            f.appendChild(c);
            a.appendChild(f)
        };
        return b
    }(),
    ItemSystem = function() {
        function b() {
            this.lowestUnregisteredRecipeID = this.lowestUnregisteredId = 0;
            this.Name = "Item";
            this.lowestUnregisteredRecipeID = this.lowestUnregisteredId = 0;
            this.items = [];
            this.recipes = []
        }
        b.prototype.LookupItem = function(a) {
            return this.items[a]
        };
        b.prototype.Reset = function() {
            for (var a = this.lowestUnregisteredId = this.lowestUnregisteredRecipeID = 0; a < this.items.length; ++a) this.items[a].ValueModifier = 1;
            for (a = 0; a < this.recipes.length; ++a) this.recipes[a].Clear();
            game && game.inventoryUI.resetConfigPanel();
            this.items = [];
            this.recipes = []
        };
        b.prototype.RegisterItem = function(a) {
            a.SetID(this.lowestUnregisteredId);
            this.items[this.lowestUnregisteredId] = a;
            this.lowestUnregisteredId++;
            0 > a.Quantity && (a.Quantity = 0)
        };
        b.prototype.RegisterRecipe = function(a) {
            a.SetID(this.lowestUnregisteredRecipeID);
            this.recipes[this.lowestUnregisteredRecipeID] = a;
            this.lowestUnregisteredRecipeID++
        };
        return b
    }(),
    Item = function() {
        function b() {
            this.ValueModifier = 1;
            this.DisplayInInventory = !0
        }
        b.prototype.Item = function() {};
        b.prototype.Gather = function() {
            this.Quantity++;
            this.Alltime++
        };
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.SetName = function(a) {
            this.Name = a;
            return this
        };
        b.prototype.SetValue = function(a) {
            this.Value = a;
            return this
        };
        b.prototype.SetQuantity = function(a) {
            this.Quantity = a;
            return this
        };
        b.prototype.SetAlltime =
            function(a) {
                this.Alltime = a;
                return this
            };
        b.prototype.SetRarity = function(a) {
            this.Rarity = a;
            return this
        };
        b.prototype.SetType = function(a) {
            this.Type = a;
            return this
        };
        b.prototype.SetProbability = function(a) {
            this.Probability = a;
            return this
        };
        b.prototype.SetDisplayInInventory = function(a) {
            this.DisplayInInventory = a;
            return this
        };
        b.prototype.SetRecipe = function(a) {
            this.Recipe = a;
            return this
        };
        b.prototype.SetStoreCategory = function(a) {
            this.StoreCategory = a;
            return this
        };
        b.prototype.SetPrice = function(a) {
            this.Price = a;
            return this
        };
        b.prototype.SetBuff = function(a) {
            this.Buff = a;
            return this
        };
        b.prototype.GetPrice = function() {
            return this.Price
        };
        b.prototype.GetValue = function() {
            return clamp(Math.floor(this.Value * this.ValueModifier), 1, 1E14)
        };
        return b
    }(),
    Recipe = function() {
        function b() {
            this.inputs = [];
            this.outputs = []
        }
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.Clear = function() {
            this.inputs = [];
            this.outputs = []
        };
        b.prototype.AddInput = function(a) {
            this.inputs.push(a);
            return this
        };
        b.prototype.AddOutput = function(a) {
            this.outputs.push(a);
            return this
        };
        b.prototype.SetName = function(a) {
            this.name = a;
            return this
        };
        b.prototype.GetInputs = function() {
            for (var a = [], f = 0; f < this.inputs.length; ++f) a.push(new ItemQuantityPair(this.inputs[f].item, this.inputs[f].quantity));
            return a
        };
        return b
    }(),
    ProcessorRecipe = function() {
        function b() {}
        b.prototype.SetRecipe = function(a) {
            this.Recipe = a;
            return this
        };
        b.prototype.SetDuration = function(a) {
            this.Duration = a;
            return this
        };
        return b
    }(),
    ItemRarity;
(function(b) {
    b[b.Common = 1] = "Common";
    b[b.Uncommon = 2] = "Uncommon";
    b[b.Rare = 3] = "Rare";
    b[b.Epic = 4] = "Epic";
    b[b.Legendary = 5] = "Legendary"
})(ItemRarity || (ItemRarity = {}));
var ItemColor;
(function(b) {
    b[b.Grey = 1] = "Grey";
    b[b.Green = 2] = "Green";
    b[b.Blue = 3] = "Blue";
    b[b.Purple = 4] = "Purple";
    b[b.Orange = 5] = "Orange"
})(ItemColor || (ItemColor = {}));
var ItemType;
(function(b) {
    b[b.Ore = 0] = "Ore";
    b[b.Gem = 1] = "Gem";
    b[b.Ingredient = 2] = "Ingredient";
    b[b.Crafting = 3] = "Crafting";
    b[b.Potion = 4] = "Potion"
})(ItemType || (ItemType = {}));
var Stone = new Item,
    Copper = new Item,
    Iron = new Item,
    Silver = new Item,
    Gold = new Item,
    Uranium = new Item,
    Titanium = new Item,
    Opal = new Item,
    Jade = new Item,
    Topaz = new Item,
    Sapphire = new Item,
    Emerald = new Item,
    Ruby = new Item,
    Onyx = new Item,
    Quartz = new Item,
    Diamond = new Item,
    Bronze_bar = new Item,
    Iron_bar = new Item,
    Silver_bar = new Item,
    Gold_bar = new Item,
    Titanium_bar = new Item,
    Ardigal = new Item,
    Sito = new Item,
    Volencia = new Item,
    Fellstalk = new Item,
    Redberries = new Item,
    Jangerberries = new Item,
    Snape_grass = new Item,
    Vial_of_water = new Item,
    Gunpowder = new Item,
    Logs = new Item,
    Oil = new Item,
    Coins = new Item,
    Smelting_Potion = new Item,
    Clicking_Potion = new Item,
    Charming_Potion = new Item,
    Alchemy_Potion = new Item,
    TNT = new Item,
    Copper_Wire = new Item,
    Adblock = new Item,
    Steel_bar = new Item,
    Smelting_Potion_recipe = (new Recipe).AddInput(new ItemQuantityPair(Ardigal, 1)).AddInput(new ItemQuantityPair(Redberries, 10)).AddOutput(new ItemQuantityPair(Smelting_Potion, 1)).AddInput(new ItemQuantityPair(Vial_of_water, 1)),
    Clicking_Potion_recipe = (new Recipe).AddInput(new ItemQuantityPair(Sito,
        1)).AddInput(new ItemQuantityPair(Jangerberries, 10)).AddOutput(new ItemQuantityPair(Clicking_Potion, 1)).AddInput(new ItemQuantityPair(Vial_of_water, 1)),
    Charming_Potion_recipe = (new Recipe).AddInput(new ItemQuantityPair(Fellstalk, 1)).AddInput(new ItemQuantityPair(Quartz, 20)).AddOutput(new ItemQuantityPair(Charming_Potion, 1)).AddInput(new ItemQuantityPair(Vial_of_water, 1)),
    Alchemy_Potion_recipe = (new Recipe).AddInput(new ItemQuantityPair(Volencia, 5)).AddInput(new ItemQuantityPair(Gold_bar, 20)).AddOutput(new ItemQuantityPair(Alchemy_Potion,
        1)).AddInput(new ItemQuantityPair(Vial_of_water, 1)),
    Bronze_bar_recipe = (new Recipe).AddInput(new ItemQuantityPair(Copper, 1)).AddInput(new ItemQuantityPair(Oil, 50)).AddOutput(new ItemQuantityPair(Bronze_bar, 1)),
    Iron_bar_recipe = (new Recipe).AddInput(new ItemQuantityPair(Iron, 1)).AddInput(new ItemQuantityPair(Oil, 150)).AddOutput(new ItemQuantityPair(Iron_bar, 1)),
    Steel_bar_recipe = (new Recipe).AddInput(new ItemQuantityPair(Iron, 1)).AddInput(new ItemQuantityPair(Oil, 300)).AddOutput(new ItemQuantityPair(Steel_bar,
        1)),
    Silver_bar_recipe = (new Recipe).AddInput(new ItemQuantityPair(Silver, 1)).AddInput(new ItemQuantityPair(Oil, 300)).AddOutput(new ItemQuantityPair(Silver_bar, 1)),
    Gold_bar_recipe = (new Recipe).AddInput(new ItemQuantityPair(Gold, 1)).AddInput(new ItemQuantityPair(Oil, 700)).AddOutput(new ItemQuantityPair(Gold_bar, 1)),
    Titanium_bar_recipe = (new Recipe).AddInput(new ItemQuantityPair(Titanium, 1)).AddInput(new ItemQuantityPair(Oil, 1400)).AddOutput(new ItemQuantityPair(Titanium_bar, 1)),
    Bronze_bar_processor_recipe =
    (new ProcessorRecipe).SetRecipe(Bronze_bar_recipe).SetDuration(5),
    Iron_bar_processor_recipe = (new ProcessorRecipe).SetRecipe(Iron_bar_recipe).SetDuration(15),
    Steel_bar_processor_recipe = (new ProcessorRecipe).SetRecipe(Steel_bar_recipe).SetDuration(30),
    Silver_bar_processor_recipe = (new ProcessorRecipe).SetRecipe(Silver_bar_recipe).SetDuration(35),
    Gold_bar_processor_recipe = (new ProcessorRecipe).SetRecipe(Gold_bar_recipe).SetDuration(75),
    Titanium_bar_processor_recipe = (new ProcessorRecipe).SetRecipe(Titanium_bar_recipe).SetDuration(165),
    Smelting_Potion_processor_recipe = (new ProcessorRecipe).SetRecipe(Smelting_Potion_recipe).SetDuration(15),
    Clicking_Potion_processor_recipe = (new ProcessorRecipe).SetRecipe(Clicking_Potion_recipe).SetDuration(15),
    Charming_Potion_processor_recipe = (new ProcessorRecipe).SetRecipe(Charming_Potion_recipe).SetDuration(15),
    Alchemy_Potion_processor_recipe = (new ProcessorRecipe).SetRecipe(Alchemy_Potion_recipe).SetDuration(15),
    Copper_Wire_Recipe = new Recipe,
    TNT_Recipe = new Recipe,
    GathererSystem = function() {
        function b() {
            this.lowestUnregisteredId =
                0;
            this.Name = "Gatherer";
            this.Reset()
        }
        b.prototype.CalculateGatherers = function() {
            for (var a = Pumpjack.adjustedMinePerTick + BigTexan.adjustedMinePerTick, f = 0, e = [], e = e.concat(this.items), b = 0; b < this.items.length; ++b) {
                var c = this.items[b];
                0 < c.Quantity && c.Enabled ? (f += c.totalFuelConsumed, c.CalculateMiningStuff()) : c.fuelTank = 0
            }
            e.sort(function(a, f) {
                return f.adjustedMinePerTick / f.totalFuelConsumed - a.adjustedMinePerTick / a.totalFuelConsumed
            });
            for (var b = a = Oil.Quantity > a ? Oil.Quantity : a, g = 0; g < e.length; ++g) c = e[g], 0 < c.Quantity &&
                c.Enabled && (c.fuelTank = c.totalFuelConsumed > b ? b : c.totalFuelConsumed, b = c.totalFuelConsumed > b ? 0 : b - c.totalFuelConsumed);
            StatOilConsumed.Value = a > f ? f : a;
            Oil.Quantity = StatOilConsumed.Value === Pumpjack.minePerTick + BigTexan.minePerTick && Oil.Quantity <= StatOilConsumed.Value + 2 ? Pumpjack.minePerTick + BigTexan.minePerTick : Oil.Quantity - StatOilConsumed.Value * game.frameTime
        };
        b.prototype.Reset = function() {
            if (this.items)
                for (var a = 0; a < this.items.length; ++a) this.items[a].GuaranteedOre = [], this.items[a].adjustedMinePerTick =
                    0, this.items[a].fuelTank = 0, this.items[a].MineableOre = [], this.items[a].EfficiencyModifier = 1;
            this.lowestUnregisteredId = 0;
            this.items = []
        };
        b.prototype.LookupGatherer = function(a) {
            return this.items[a]
        };
        b.prototype.RegisterItem = function(a) {
            a.SetID(this.lowestUnregisteredId);
            this.items[this.lowestUnregisteredId] = a;
            this.lowestUnregisteredId++
        };
        b.prototype.Purchase = function(a) {
            a = this.items[a];
            game.inventory.deductFunds(a.GetPrice()) && a.Quantity++
        };
        b.prototype.Mine = function() {
            this.CalculateGatherers();
            for (var a =
                    0; a < this.items.length; ++a) {
                var f = this.items[a];
                f.AutoMine && f.Mine()
            }
        };
        return b
    }(),
    Gatherer = function() {
        function b() {
            this.Display = this.Enabled = this.AutoMine = !0;
            this.fuelTank = this.incrFuelConsumed = this.baseFuelConsumed = this.totalFuelConsumed = 0;
            this.EfficiencyModifier = 1;
            this.incrProbabilityModifier = this.upgrProbabilityModifier = this.totalProbabilityModifier = this.oreBuffer = 0;
            this.StoreCategory = 1;
            this.adjustedMinePerTick = this.ChanceOfNothing = 0;
            this.MineableOre = [];
            this.GuaranteedOre = []
        }
        Object.defineProperty(b.prototype,
            "Active", {
                get: function() {
                    return 0 < this.Quantity
                },
                enumerable: !0,
                configurable: !0
            });
        b.prototype.CalculateMiningStuff = function() {
            var a = 0;
            this.TotalOreProbability = 0;
            this.totalFuelConsumed = this.incrFuelConsumed * this.Quantity;
            this.totalProbabilityModifier = this.upgrProbabilityModifier + this.incrProbabilityModifier * this.Quantity;
            this.totalEfficiency = this.Quantity * this.incrEfficiency;
            this.adjustedMinePerTick = 0;
            this.OreProbability = [];
            for (var f = 0; f < this.MineableOre.length; ++f) {
                var b = this.MineableOre[f].Probability;
                this.OreProbability[f] = b;
                a += b;
                this.TotalOreProbability += b
            }
            a /= this.MineableOre.length;
            for (f = 0; f < this.MineableOre.length; ++f) this.OreProbability[f] = this.OreProbability[f] >= a ? this.OreProbability[f] / (1 + this.totalProbabilityModifier) : this.OreProbability[f] * (1 + this.totalProbabilityModifier);
            this.adjustedMinePerTick = (this.baseEfficiency + this.totalEfficiency) * this.EfficiencyModifier
        };
        b.prototype.ManualMine = function() {
            this.oreBuffer = 0;
            var a = Math.floor(this.adjustedMinePerTick + this.oreBuffer);
            this.oreBuffer +=
                this.adjustedMinePerTick - a;
            if (0 < this.MineableOre.length)
                for (var f = 0; f < a; ++f)
                    for (var b = randomInt(0, this.TotalOreProbability), d = 0, c = 0; c < this.OreProbability.length; ++c)
                        if (d += this.OreProbability[c], b < d) {
                            0 === randomInt(0, this.ChanceOfNothing) && this.MineableOre[c].Gather();
                            break
                        }
        };
        b.prototype.Mine = function() {
            this.fuelEfficiency = this.fuelTank / this.totalFuelConsumed;
            this.fuelEfficiency = isNaN(this.fuelEfficiency) ? 0 : this.fuelEfficiency;
            this.adjustedMinePerTick = 0 < this.totalFuelConsumed ? this.adjustedMinePerTick *
                this.fuelEfficiency : this.adjustedMinePerTick;
            0 === this.Quantity && (this.totalEfficiency = this.adjustedMinePerTick = 0, this.totalProbabilityModifier = this.upgrProbabilityModifier, this.totalFuelConsumed = 0);
            this.minePerTick = this.adjustedMinePerTick;
            this.adjustedMinePerTick *= game.frameTime;
            this.adjustedMinePerTick += this.oreBuffer;
            var a = Math.floor(this.adjustedMinePerTick);
            this.oreBuffer = this.adjustedMinePerTick - a;
            this.adjustedMinePerTick = a;
            if (this.Enabled) {
                if (0 < this.MineableOre.length)
                    for (a = 0; a < this.adjustedMinePerTick; ++a)
                        for (var f =
                                randomInt(0, this.TotalOreProbability), b = 0, d = 0; d < this.OreProbability.length; ++d)
                            if (b += this.OreProbability[d], f < b) {
                                0 === randomInt(0, this.ChanceOfNothing) && this.MineableOre[d].Gather();
                                break
                            }
                if (0 < this.GuaranteedOre.length)
                    for (a = 0; a < this.adjustedMinePerTick; ++a)
                        for (d = 0; d < this.GuaranteedOre.length; ++d) this.GuaranteedOre[d].Gather()
            } else this.minePerTick = 0
        };
        b.prototype.SetNothingChance = function(a) {
            this.ChanceOfNothing = a;
            return this
        };
        b.prototype.SetAutoMine = function(a) {
            this.AutoMine = a;
            return this
        };
        b.prototype.GetPrice =
            function() {
                var a = Math.pow(this.PriceModifier, this.Quantity);
                return Math.ceil(a * this.BasePrice)
            };
        b.prototype.SetBasePrice = function(a) {
            this.BasePrice = a;
            return this
        };
        b.prototype.SetPriceModifier = function(a) {
            this.PriceModifier = a;
            return this
        };
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.SetDisplay = function(a) {
            this.Display = a;
            return this
        };
        b.prototype.SetName = function(a) {
            this.Name = a;
            return this
        };
        b.prototype.SetQuantity = function(a) {
            this.Quantity = a;
            return this
        };
        b.prototype.setBaseFuelConsumed = function(a) {
            this.baseFuelConsumed =
                a;
            return this
        };
        b.prototype.setIncrFuelConsumed = function(a) {
            this.incrFuelConsumed = a;
            return this
        };
        b.prototype.SetMaxOwned = function(a) {
            this.MaxOwned = a;
            return this
        };
        b.prototype.AddGuaranteedOre = function(a) {
            this.GuaranteedOre.push(a);
            return this
        };
        b.prototype.AddMineableOre = function(a) {
            this.MineableOre.push(a);
            return this
        };
        b.prototype.AddMineableOres = function(a) {
            this.MineableOre = this.MineableOre.concat(this.MineableOre, a);
            return this
        };
        b.prototype.setBaseEfficiency = function(a) {
            this.baseEfficiency = 0;
            return this
        };
        b.prototype.setIncrEfficiency = function(a) {
            this.incrEfficiency = a;
            return this
        };
        b.prototype.setIncrProbability = function(a) {
            this.incrProbabilityModifier = a;
            return this
        };
        b.prototype.setMiningOverride = function(a) {
            this.miningTextOverride = a;
            return this
        };
        b.prototype.setRequires = function(a) {
            this.requires = a;
            return this
        };
        b.prototype.SetStoreCategory = function(a) {
            this.StoreCategory = a;
            return this
        };
        return b
    }(),
    Player = new Gatherer,
    Miner = new Gatherer,
    Lumberjack = new Gatherer,
    Pumpjack = new Gatherer,
    BigTexan = new Gatherer,
    Drill = new Gatherer,
    Crusher = new Gatherer,
    Excavator = new Gatherer,
    MegaDrill = new Gatherer,
    ProcessorSystem = function() {
        function b() {
            this.lowestUnregisteredId = 0;
            this.Name = "Processor";
            this.Reset()
        }
        b.prototype.LookupItem = function(a) {
            return this.items[a]
        };
        b.prototype.RegisterItem = function(a) {
            a.SetID(this.lowestUnregisteredId);
            this.items[this.lowestUnregisteredId] = a;
            this.lowestUnregisteredId++
        };
        b.prototype.Reset = function() {
            this.lowestUnregisteredId = 0;
            this.items = []
        };
        b.prototype.DisplayProcessors = function() {
            for (var a =
                    0; a < this.items.length; ++a) {
                var f = this.items[a];
                f.UI = new ProcessorUI(f);
                document.getElementById("tabs-Crafting").appendChild(f.Display())
            }
        };
        b.prototype.Process = function() {
            for (var a = 0; a < this.items.length; ++a) this.items[a].Tick()
        };
        return b
    }(),
    Processor = function() {
        function b() {
            this.Recipes = [];
            this.baseEfficiency = 1;
            this.Enabled = !1;
            this.Capacity = 100;
            this.outputBase = this.outputModifier = 1;
            this.Jobs = this.ActiveProgress = this.ActiveJobs = 0;
            this.MaxProgress = 100;
            this.Progress = 0
        }
        b.prototype.Processor = function() {};
        b.prototype.GetRecipeIndex = function() {
            for (var a = 0; a < this.Recipes.length; ++a)
                if (this.Recipes[a] === this.ActiveRecipe) return a;
            return 0
        };
        b.prototype.Deactivate = function() {
            for (var a = 0; a < this.ActiveRecipe.Recipe.inputs.length; ++a) this.ActiveRecipe.Recipe.inputs[a].item.Quantity += Math.floor(this.ActiveRecipe.Recipe.inputs[a].quantity * (this.ActiveJobs - this.ActiveProgress) / 2);
            this.Progress = this.ActiveJobs = 0
        };
        b.prototype.Activate = function() {
            var a = !0;
            this.ActiveRecipe = this.Recipe;
            this.MaxProgress = this.Recipe.Duration;
            if (0 === this.ActiveJobs) {
                for (var f = 0; f < this.ActiveRecipe.Recipe.inputs.length; ++f) {
                    var b = this.ActiveRecipe.Recipe.inputs[f];
                    b.item.Quantity < b.quantity * this.Jobs && (a = !1)
                }
                if (a)
                    for (f = 0; f < this.ActiveRecipe.Recipe.inputs.length; ++f) b = this.ActiveRecipe.Recipe.inputs[f], this.ActiveRecipe.Recipe.inputs[f].item.Quantity -= b.quantity * this.Jobs
            }
            a && (this.MaxProgress = this.Recipe.Duration, this.Progress = 0, this.ActiveJobs = this.Jobs, this.ActiveRecipe = this.Recipe, this.ActiveProgress = 0)
        };
        b.prototype.Tick = function() {
            0 <
                this.ActiveJobs ? (this.RemainingTime = Math.ceil((this.ActiveRecipe.Duration * (this.ActiveJobs - this.ActiveProgress) - this.Progress) / this.baseEfficiency), this.MaxProgress = this.ActiveRecipe.Duration) : this.RemainingTime = 0;
            this.Jobs > this.Capacity && (this.Jobs = this.Capacity);
            if (0 < this.ActiveJobs) {
                if (this.Progress >= this.MaxProgress) {
                    this.ActiveProgress++;
                    for (var a = this.Progress = 0; a < this.ActiveRecipe.Recipe.outputs.length; ++a) game.inventory.addManyItems(this.ActiveRecipe.Recipe.outputs[a].item.ID, this.outputBase *
                        this.outputModifier)
                } else this.Progress += 1 * this.baseEfficiency * game.frameTime;
                if (this.ActiveProgress >= this.ActiveJobs) {
                    for (var f = "", b = [], a = 0; a < this.ActiveRecipe.Recipe.outputs.length; ++a) b.push(this.ActiveRecipe.Recipe.outputs[a].item.Name);
                    f = f.concat(b.join(", "));
                    a = msg.create();
                    a.type = 2;
                    a.text = this.Name + " finished processing " + this.ActiveJobs + " " + f + ".";
                    a.timeout = 10;
                    a.send();
                    this.Progress = this.ActiveJobs = 0
                }
            }
            this.UI.update()
        };
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.AddRecipe = function(a) {
            this.Recipes.push(a);
            return this
        };
        b.prototype.SetCapacity = function(a) {
            this.Capacity = a;
            return this
        };
        b.prototype.SetName = function(a) {
            this.Name = a;
            return this
        };
        b.prototype.Display = function() {
            this.Recipe = this.Recipes[0];
            return this.UI.Display()
        };
        b.prototype.Reset = function() {
            this.Progress = this.ActiveJobs = 0;
            this.Enabled = !1;
            return this
        };
        return b
    }(),
    Furnace = new Processor,
    Cauldron = new Processor,
    StoreSystem = function() {
        function b() {
            this.lowestUnregisteredId = 0;
            this.reset()
        }
        b.prototype.reset = function() {
            if (this.items)
                for (var a = 0; a <
                    this.items.length; ++a) this.items[a].reset();
            this.lowestUnregisteredId = 0;
            this.items = []
        };
        b.prototype.registerItem = function(a) {
            this.items[this.lowestUnregisteredId] = a;
            a.id = this.lowestUnregisteredId;
            this.lowestUnregisteredId++
        };
        b.prototype.tick = function() {
            for (var a = 0; a < this.items.length; ++a) this.items[a].requirement.Active && this.items[a].open && this.items[a].tick()
        };
        return b
    }(),
    Store = function() {
        function b() {
            this.open = !0;
            this.pvalueModifier = this.efficiency = this.salesEfficiency = 1;
            this.reset()
        }
        b.prototype.reset =
            function() {
                this.stock = [];
                this.valueModifier = this.efficiency = this.salesEfficiency = 1;
                this.lastSale = Date.now()
            };
        Object.defineProperty(b.prototype, "saleValue", {
            get: function() {
                var a = this.getHighestValueItem();
                return a ? a.Value * this.valueModifier * Math.min(this.saleAmount, a.Quantity) : 0
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "valueModifier", {
            get: function() {
                return this.pvalueModifier + (this.populationBonus - 1)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "populationBonus", {
            get: function() {
                return 1 + Math.floor(StatPopulation.Value / this.populationBuff) / 100
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "saleAmount", {
            get: function() {
                return this.sales * this.salesEfficiency
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "sellTime", {
            get: function() {
                return this.sellTimeP / this.efficiency
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "sellPercentage", {
            get: function() {
                return this.timeSinceLastSale / this.sellTime
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "timeSinceLastSale", {
            get: function() {
                return Date.now() - this.lastSale
            },
            enumerable: !0,
            configurable: !0
        });
        b.prototype.setPopulationBonus = function(a) {
            this.populationBuff = a;
            return this
        };
        b.prototype.setName = function(a) {
            this.name = a;
            return this
        };
        b.prototype.setRequirement = function(a) {
            this.requirement = a;
            return this
        };
        b.prototype.setAmountSold = function(a) {
            this.sales = a;
            return this
        };
        b.prototype.setSellTime = function(a) {
            this.sellTimeP = a;
            return this
        };
        b.prototype.setEfficiency =
            function(a) {
                this.efficiency = a;
                return this
            };
        b.prototype.addStock = function(a) {
            this.stock = this.stock.concat(this.stock, a);
            this.stock.sort(function(a, b) {
                return a.Value < b.Value ? 1 : a.Value > b.Value ? -1 : 0
            });
            return this
        };
        b.prototype.getHighestValueItem = function() {
            for (var a, f = 0; f < this.stock.length; ++f)
                if (0 < this.stock[f].Quantity) {
                    a = this.stock[f];
                    break
                }
            return a
        };
        b.prototype.tick = function() {
            if (this.timeSinceLastSale >= this.sellTime) {
                var a = this.getHighestValueItem();
                if (a) {
                    this.lastSale = Date.now();
                    var f = Math.min(this.saleAmount,
                            Math.floor(a.Quantity)),
                        b = f * a.Value * this.valueModifier;
                    a.Quantity -= f;
                    Coins.Quantity += b;
                    console.log("Selling " + f + " " + a.Name + " for " + b)
                }
            }
        };
        return b
    }(),
    GasStationStore = new Store,
    UpgradeSystem = function() {
        function b() {
            this.lowestUnregisteredId = 0;
            this.Name = "Upgrade";
            this.Reset()
        }
        b.prototype.LookupUpgrade = function(a) {
            return this.items[a]
        };
        b.prototype.RegisterItem = function(a) {
            a.SetID(this.lowestUnregisteredId);
            this.items[this.lowestUnregisteredId] = a;
            this.lowestUnregisteredId++
        };
        b.prototype.ActivateOnLoad =
            function() {
                for (var a = 0; a < this.items.length; ++a) this.items[a].Active && this.items[a].Activate()
            };
        b.prototype.Reset = function() {
            if (this.items)
                for (var a = 0; a < this.items.length; ++a) {
                    if (this.items[a].Active)
                        for (var f = 0; f < this.items[a].Effect.length; ++f) this.items[a].Effect[f].deactivate();
                    this.items[a].Effect = []
                }
            this.lowestUnregisteredId = 0;
            this.items = []
        };
        b.prototype.UpgradeFromBuilding = function() {
            MiningCamp.Active && !MiningCampUpgrade.Active && MiningCampUpgrade.Activate();
            LoggingCamp.Active && !LoggingCampUpgrade.Active &&
                LoggingCampUpgrade.Activate()
        };
        b.prototype.Purchase = function(a) {
            a = this.items[a];
            game.inventory.deductFunds(a.Price) && a.Activate()
        };
        return b
    }(),
    Upgrade = function() {
        function b() {
            this.Display = !0;
            this.Price = 0;
            this.Effect = []
        }
        b.prototype.Activate = function() {
            this.Active = !0;
            for (var a = 0; a < this.Effect.length; ++a) this.Effect[a].effect()
        };
        b.prototype.Deactivate = function() {
            this.Active = !1;
            for (var a = 0; a < this.Effect.length; ++a) this.Effect[a].deactivate()
        };
        b.prototype.GetPrice = function(a) {
            return this.Price
        };
        b.prototype.GetTooltip =
            function() {
                for (var a = "", f = 0; f < this.Effect.length; ++f) a += this.Effect[f].tooltip() + ". ";
                return a
            };
        b.prototype.SetDisplay = function(a) {
            this.Display = a;
            return this
        };
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.SetName = function(a) {
            this.Name = a;
            return this
        };
        b.prototype.SetActive = function(a) {
            this.Active = a;
            return this
        };
        b.prototype.SetRequires = function(a) {
            this.Requires = a;
            return this
        };
        b.prototype.SetType = function(a) {
            this.Type = a;
            return this
        };
        b.prototype.AddEffect = function(a) {
            this.Effect.push(a);
            return this
        };
        b.prototype.SetPrice = function(a) {
            this.Price = a;
            return this
        };
        b.prototype.SetRecipe = function(a) {
            this.Recipe = a;
            return this
        };
        b.prototype.SetStoreCategory = function(a) {
            this.StoreCategory = a;
            return this
        };
        return b
    }(),
    UpgradeType;
(function(b) {
    b[b.Purchased = 0] = "Purchased";
    b[b.Crafted = 1] = "Crafted";
    b[b.Researched = 2] = "Researched";
    b[b.Gas_Station = 3] = "Gas_Station"
})(UpgradeType || (UpgradeType = {}));
var UpgradeEffect = function() {
        function b() {
            this.duration = -1
        }
        b.prototype.effect = function() {};
        b.prototype.deactivate = function() {};
        b.prototype.tooltip = function() {};
        return b
    }(),
    NothingEffect = function(b) {
        function a() {
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {};
        a.prototype.deactivate = function() {};
        a.prototype.tooltip = function() {
            return this.tooltipOverride
        };
        a.prototype.overrideTooltip = function(a) {
            this.tooltipOverride = a;
            return this
        };
        return a
    }(UpgradeEffect),
    MaxQuantityUpgradeEffect = function(b) {
        function a(a,
            e) {
            this.AffectedGatherers = [];
            this.AffectedGatherers = this.AffectedGatherers.concat(a);
            this.Quantity = e;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].MaxOwned += this.Quantity
        };
        a.prototype.deactivate = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].MaxOwned -= this.Quantity
        };
        a.prototype.tooltip = function() {
            return "Null"
        };
        return a
    }(UpgradeEffect),
    OreUpgradeEffect = function(b) {
        function a(a, e) {
            this.AddedOre = [];
            this.AffectedGatherers = [];
            this.AddedOre = this.AddedOre.concat(a);
            this.AffectedGatherers = this.AffectedGatherers.concat(e);
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].MineableOre = this.AffectedGatherers[a].MineableOre.concat(this.AddedOre), this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.deactivate = function() {
            for (var a in this.AffectedGatherers) {
                for (var b = 0; b < this.AddedOre.length; ++b)
                    for (var d = 0; d < this.AffectedGatherers[a].MineableOre.length; ++d) this.AddedOre[b] ===
                        this.AffectedGatherers[a].MineableOre[d] && this.AffectedGatherers[a].MineableOre.splice(d, 1);
                this.AffectedGatherers[a].CalculateMiningStuff()
            }
        };
        a.prototype.tooltip = function() {
            for (var a = "Discovers: ", b = [], d = 0; d < this.AddedOre.length; ++d) b.push(this.AddedOre[d].Name);
            return a = a.concat(b.join(", "))
        };
        return a
    }(UpgradeEffect),
    StoreValueUpgradeEffect = function(b) {
        function a(a, e) {
            this.affectedStores = [];
            this.affectedStores = this.affectedStores.concat(e);
            this.value = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect =
            function() {
                for (var a in this.affectedStores) this.affectedStores[a].pvalueModifier += this.value
            };
        a.prototype.deactivate = function() {
            for (var a in this.affectedStores) this.affectedStores[a].pvalueModifier = 100 * this.affectedStores[a].pvalueModifier / 100 - this.value
        };
        a.prototype.tooltip = function() {
            var a = [],
                b;
            for (b in this.affectedStores) a.push(this.affectedStores[b].name);
            a = "Increases value of items sold by ".concat(a.join(", "));
            return a += " by " + 100 * this.value + "%"
        };
        return a
    }(UpgradeEffect),
    StoreSaleQuantityUpgradeEffect =
    function(b) {
        function a(a, e) {
            this.affectedStores = [];
            this.affectedStores = this.affectedStores.concat(e);
            this.efficiency = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.affectedStores) this.affectedStores[a].salesEfficiency += this.efficiency
        };
        a.prototype.deactivate = function() {
            for (var a in this.affectedStores) this.affectedStores[a].salesEfficiency = 100 * this.affectedStores[a].salesEfficiency / 100 - this.efficiency
        };
        a.prototype.tooltip = function() {
            var a = [],
                b;
            for (b in this.affectedStores) a.push(this.affectedStores[b].name);
            a = "Increases quantity of items sold by ".concat(a.join(", "));
            return a += " by " + 100 * this.efficiency + "%"
        };
        return a
    }(UpgradeEffect),
    StoreSaleSpeedUpgradeEffect = function(b) {
        function a(a, e) {
            this.affectedStores = [];
            this.affectedStores = this.affectedStores.concat(e);
            this.efficiency = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.affectedStores) this.affectedStores[a].efficiency += this.efficiency
        };
        a.prototype.deactivate = function() {
            for (var a in this.affectedStores) this.affectedStores[a].efficiency =
                100 * this.affectedStores[a].efficiency / 100 - this.efficiency
        };
        a.prototype.tooltip = function() {
            var a = [],
                b;
            for (b in this.affectedStores) a.push(this.affectedStores[b].name);
            a = "Increases sell speed of ".concat(a.join(", "));
            return a += " by " + 100 * this.efficiency + "%"
        };
        return a
    }(UpgradeEffect),
    EfficiencyUpgradeEffect = function(b) {
        function a(a, e) {
            this.AffectedGatherers = [];
            this.AffectedGatherers = this.AffectedGatherers.concat(e);
            this.Efficiency = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].incrEfficiency =
                0 !== this.AffectedGatherers[a].incrEfficiency && this.AffectedGatherers[a].incrEfficiency ? this.AffectedGatherers[a].incrEfficiency + this.Efficiency : this.Efficiency, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.deactivate = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].incrEfficiency = 100 * this.AffectedGatherers[a].incrEfficiency / 100 - this.Efficiency, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.tooltip = function() {
            for (var a = "Increases resources gathered per tick by " +
                    this.Efficiency + " for ", b = [], d = 0; d < this.AffectedGatherers.length; ++d) b.push(this.AffectedGatherers[d].Name);
            return a = a.concat(b.join(", "))
        };
        return a
    }(UpgradeEffect),
    BaseEfficiencyUpgradeEffect = function(b) {
        function a(a, e) {
            this.AffectedGatherers = [];
            this.AffectedGatherers = this.AffectedGatherers.concat(e);
            this.Efficiency = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].baseEfficiency = 0 !== this.AffectedGatherers[a].baseEfficiency &&
                this.AffectedGatherers[a].baseEfficiency ? this.AffectedGatherers[a].baseEfficiency + this.Efficiency : this.Efficiency, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.deactivate = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].baseEfficiency = 100 * this.AffectedGatherers[a].baseEfficiency / 100 - this.Efficiency, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.tooltip = function() {
            for (var a = "Increases resources gathered per tick by " + this.Efficiency + " for ", b = [], d = 0; d < this.AffectedGatherers.length; ++d) b.push(this.AffectedGatherers[d].Name);
            return a = a.concat(b.join(", "))
        };
        return a
    }(UpgradeEffect),
    EfficiencyMagnitudeUpgradeEffect = function(b) {
        function a(a, e) {
            this.AffectedGatherers = [];
            this.AffectedGatherers = this.AffectedGatherers.concat(e);
            this.Efficiency = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].EfficiencyModifier += this.Efficiency, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.deactivate = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].EfficiencyModifier = 100 * this.AffectedGatherers[a].EfficiencyModifier / 100 - this.Efficiency, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.tooltip = function() {
            for (var a = "Increases resources gathered by " + 100 * this.Efficiency + "% for ", b = [], d = 0; d < this.AffectedGatherers.length; ++d) b.push(this.AffectedGatherers[d].Name);
            return a = a.concat(b.join(", "))
        };
        return a
    }(UpgradeEffect),
    ProbabilityUpgradeEffect =
    function(b) {
        function a(a, e) {
            this.AffectedGatherers = [];
            this.AffectedGatherers = this.AffectedGatherers.concat(e);
            this.Probability = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].upgrProbabilityModifier || (this.AffectedGatherers[a].upgrProbabilityModifier = 0), this.AffectedGatherers[a].upgrProbabilityModifier += this.Probability, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.deactivate = function() {
            for (var a in this.AffectedGatherers) this.AffectedGatherers[a].upgrProbabilityModifier =
                100 * this.AffectedGatherers[a].upgrProbabilityModifier / 100 - this.Probability, this.AffectedGatherers[a].CalculateMiningStuff()
        };
        a.prototype.tooltip = function() {
            for (var a = "Increases chance of gathering rare resources by " + (100 * this.Probability).toString() + "% for ", b = [], d = 0; d < this.AffectedGatherers.length; ++d) b.push(this.AffectedGatherers[d].Name);
            return a = a.concat(b.join(", "))
        };
        return a
    }(UpgradeEffect),
    ManufacturerEfficiencyUpgradeEffect = function(b) {
        function a(a, e) {
            this.Efficiency = a;
            this.AffectedProcessors =
                e;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a = 0; a < this.AffectedProcessors.length; ++a) this.AffectedProcessors[a].baseEfficiency += this.Efficiency
        };
        a.prototype.deactivate = function() {
            for (var a = 0; a < this.AffectedProcessors.length; ++a) this.AffectedProcessors[a].baseEfficiency = 100 * this.AffectedProcessors[a].baseEfficiency / 100 - this.Efficiency
        };
        a.prototype.tooltip = function() {
            for (var a = [], b = "Increases speed of ", d = 0; d < this.AffectedProcessors.length; ++d) a.push(this.AffectedProcessors[d].Name);
            b = b.concat(a.join(", "));
            return b = b.concat(" by " + 100 * this.Efficiency + "%")
        };
        return a
    }(UpgradeEffect),
    ManufacturerUnlockUpgradeEffect = function(b) {
        function a(a) {
            this.ActivatedProcessor = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            this.ActivatedProcessor.Enabled = !0
        };
        a.prototype.deactivate = function() {
            this.ActivatedProcessor.Enabled = !1
        };
        a.prototype.tooltip = function() {
            return "Unlocks: " + this.ActivatedProcessor.Name
        };
        return a
    }(UpgradeEffect),
    ItemValueUpgradeEffect = function(b) {
        function a(a) {
            this.Value =
                a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a = 0; a < game.itemSystem.items.length; ++a) game.itemSystem.items[a].ValueModifier += this.Value
        };
        a.prototype.deactivate = function() {
            for (var a = 0; a < game.itemSystem.items.length; ++a) game.itemSystem.items[a].ValueModifier = 100 * game.itemSystem.items[a].ValueModifier / 100 - this.Value
        };
        a.prototype.overrideTooltip = function(a) {
            this.tooltipOverride = a;
            return this
        };
        a.prototype.tooltip = function() {
            return this.tooltipOverride ? this.tooltipOverride : "Increases value of items by " +
                100 * this.Value + "%"
        };
        return a
    }(UpgradeEffect),
    ManufacturerOutputModifierUpgradeEffect = function(b) {
        function a(a, e) {
            this.ouput = a;
            this.affectedProcessors = e;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a = 0; a < this.affectedProcessors.length; ++a) this.affectedProcessors[a].outputModifier += this.ouput
        };
        a.prototype.deactivate = function() {
            for (var a = 0; a < this.affectedProcessors.length; ++a) this.affectedProcessors[a].outputModifier = 100 * this.affectedProcessors[a].outputModifier / 100 - this.ouput
        };
        a.prototype.tooltip = function() {
            for (var a = [], b = "Increases output of ", d = 0; d < this.affectedProcessors.length; ++d) a.push(this.affectedProcessors[d].Name);
            b = b.concat(a.join(", "));
            return b = b.concat(" by " + 100 * this.ouput + "%")
        };
        return a
    }(UpgradeEffect),
    ManufacturerCapacityUpgradeEffect = function(b) {
        function a(a, e) {
            this.Capacity = a;
            this.AffectedProcessors = e;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.effect = function() {
            for (var a = 0; a < this.AffectedProcessors.length; ++a) this.AffectedProcessors[a].Capacity += this.Capacity
        };
        a.prototype.deactivate = function() {
            for (var a = 0; a < this.AffectedProcessors.length; ++a) this.AffectedProcessors[a].Capacity = 100 * this.AffectedProcessors[a].Capacity / 100 - this.Capacity
        };
        a.prototype.tooltip = function() {
            for (var a = [], b = "Increases capacity of ", d = 0; d < this.AffectedProcessors.length; ++d) a.push(this.AffectedProcessors[d].Name);
            b = b.concat(a.join(", "));
            return b = b.concat(" by " + this.Capacity)
        };
        return a
    }(UpgradeEffect),
    BionicEyes_Effect = new ProbabilityUpgradeEffect(.35, Gatherer[1] = [Miner]),
    Environmental_Effect =
    (new NothingEffect).overrideTooltip("Unlocks: MegaDrill"),
    XrayDrills_Effect = new ProbabilityUpgradeEffect(.4, Gatherer[1] = [Drill]),
    PrecisionCrushers_Effect = new ProbabilityUpgradeEffect(.35, Gatherer[1] = [Crusher]),
    SelfLubrication_Effect = new EfficiencyMagnitudeUpgradeEffect(.4, Gatherer[4] = [Drill, Crusher, Excavator, MegaDrill]),
    ConstructionOffice_Effect = (new NothingEffect).overrideTooltip("Unlocks: Construction Office"),
    Mechanic_Effect = new EfficiencyMagnitudeUpgradeEffect(.05, Gatherer[4] = [Drill, Crusher, Excavator,
        MegaDrill
    ]),
    ExpertMechanic_Effect = new EfficiencyMagnitudeUpgradeEffect(.1, Gatherer[4] = [Drill, Crusher, Excavator, MegaDrill]),
    Foreman_Effect = new EfficiencyMagnitudeUpgradeEffect(.15, Gatherer[2] = [Miner, Lumberjack]),
    Dictator_Effect = new EfficiencyMagnitudeUpgradeEffect(.25, Gatherer[2] = [Miner, Lumberjack]),
    Oilbaron_Effect = new EfficiencyMagnitudeUpgradeEffect(.15, Gatherer[2] = [Pumpjack, BigTexan]),
    ChainsawT1_Effect = new EfficiencyUpgradeEffect(.25, Gatherer[1] = [Lumberjack]),
    ChainsawT2_Effect = new EfficiencyUpgradeEffect(.5,
        Gatherer[1] = [Lumberjack]),
    ChainsawT3_Effect = new EfficiencyUpgradeEffect(1, Gatherer[1] = [Lumberjack]),
    ChainsawT4_Effect = new EfficiencyUpgradeEffect(2, Gatherer[1] = [Lumberjack]),
    ClickUpgrade_Effect = new BaseEfficiencyUpgradeEffect(1, Gatherer[1] = [Player]),
    ClickUpgrade2_Effect = new BaseEfficiencyUpgradeEffect(5, Gatherer[1] = [Player]),
    ClickUpgrade3_Effect = new BaseEfficiencyUpgradeEffect(10, Gatherer[1] = [Player]),
    GoldenClick_Effect = new BaseEfficiencyUpgradeEffect(25, Gatherer[1] = [Player]),
    IronPickaxe_Effect = new ProbabilityUpgradeEffect(.05,
        Gatherer[1] = [Player]),
    SteelPickaxe_Effect = new ProbabilityUpgradeEffect(.1, Gatherer[1] = [Player]),
    GoldPickaxe_Effect = new ProbabilityUpgradeEffect(.15, Gatherer[1] = [Player]),
    DiamondPickaxe_Effect = new ProbabilityUpgradeEffect(.2, Gatherer[1] = [Player]),
    Researcher_Effect = new OreUpgradeEffect(Item[3] = [Sapphire, Emerald, Ruby], Gatherer[6] = [Player, Miner, Drill, Crusher, Excavator, MegaDrill]),
    Geologist_Effect = new OreUpgradeEffect(Item[3] = [Onyx, Quartz, Diamond], Gatherer[6] = [Player, Miner, Drill, Crusher, Excavator, MegaDrill]),
    Backpack_Effect = new OreUpgradeEffect(Item[4] = [Sito, Ardigal, Redberries, Jangerberries], Gatherer[1] = [Lumberjack]),
    Botanist_Effect = new OreUpgradeEffect(Item[3] = [Volencia, Fellstalk, Snape_grass], Gatherer[1] = [Lumberjack]),
    Tunnels_Effect = new OreUpgradeEffect(Item[2] = [Uranium, Titanium], Gatherer[6] = [Player, Miner, Drill, Crusher, Excavator, MegaDrill]),
    SpeechPotion_Effect = new ItemValueUpgradeEffect(.2),
    SmeltingPotion_Effect = new ManufacturerEfficiencyUpgradeEffect(.75, Processor[1] = [Furnace]),
    AlchemyPotion_Effect =
    new ManufacturerOutputModifierUpgradeEffect(2, Processor[1] = [Furnace]),
    ClickingPotion_Effect = new EfficiencyMagnitudeUpgradeEffect(1.5, Gatherer[1] = [Player]),
    AdblockDebuff_Effect = (new ItemValueUpgradeEffect(-.1)).overrideTooltip("Decreases value of items by 10%. Please consider supporting Gold Rush"),
    GoldenClick_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Gold_bar, 50)),
    Tunnels_Recipe = (new Recipe).AddInput(new ItemQuantityPair(TNT, 500)),
    Backpack_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Copper_Wire,
        100)),
    LargerCauldron_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Iron_bar, 50)),
    ReinforcedFurnace_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Stone, 5E4)).AddInput(new ItemQuantityPair(Iron_bar, 100)),
    HotterFurnace_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Stone, 1E4)).AddInput(new ItemQuantityPair(Logs, 5E4)),
    EnchantedCauldron_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Logs, 25E3)).AddInput(new ItemQuantityPair(Iron_bar, 100)),
    ChainsawT1_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Iron_bar,
        25)),
    ChainsawT2_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Steel_bar, 50)),
    ChainsawT3_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Titanium_bar, 75)),
    ChainsawT4_Recipe = (new Recipe).AddInput(new ItemQuantityPair(Diamond, 25)),
    ClickUpgrade = new Upgrade,
    ClickUpgrade2 = new Upgrade,
    ClickUpgrade3 = new Upgrade,
    GoldenClick = new Upgrade,
    IronPickaxe = new Upgrade,
    SteelPickaxe = new Upgrade,
    GoldPickaxe = new Upgrade,
    DiamondPickaxe = new Upgrade,
    Researcher = new Upgrade,
    Geologist = new Upgrade,
    Backpack = new Upgrade,
    Botanist = new Upgrade,
    Tunnels = new Upgrade,
    Foreman = new Upgrade,
    Dictator = new Upgrade,
    Mechanic = new Upgrade,
    ExpertMechanic = new Upgrade,
    OilBaron = new Upgrade,
    BionicEyes = new Upgrade,
    Environmental = new Upgrade,
    ChainsawT1 = new Upgrade,
    ChainsawT2 = new Upgrade,
    ChainsawT3 = new Upgrade,
    ChainsawT4 = new Upgrade,
    XrayDrills = new Upgrade,
    PrecisionCrushers = new Upgrade,
    SelfLubrication = new Upgrade,
    LoggingCampUpgrade_Effect = new MaxQuantityUpgradeEffect(Gatherer[1] = [Lumberjack], 90),
    MiningCampUpgrade_Effect = new MaxQuantityUpgradeEffect(Gatherer[1] = [Miner], 90),
    MiningCampUpgrade = new Upgrade,
    LoggingCampUpgrade = new Upgrade,
    EnchantedCauldron_Effect = new ManufacturerEfficiencyUpgradeEffect(.5, Processor[1] = [Cauldron]),
    CauldronUnlock_Effect = new ManufacturerUnlockUpgradeEffect(Cauldron),
    FurnaceUnlock_Effect = new ManufacturerUnlockUpgradeEffect(Furnace),
    ReinforcedFurnace_Effect = new ManufacturerCapacityUpgradeEffect(150, Processor[1] = [Furnace]),
    LargerCauldron_Effect = new ManufacturerCapacityUpgradeEffect(9, Processor[1] = [Cauldron]),
    Witch_Effect = new ManufacturerEfficiencyUpgradeEffect(.5,
        Processor[1] = [Cauldron]),
    Blacksmith_Effect = new ManufacturerEfficiencyUpgradeEffect(.25, Processor[1] = [Furnace]),
    HotterFurnace_Effect = new ManufacturerEfficiencyUpgradeEffect(.25, Processor[1] = [Furnace]),
    FurnaceUnlock = new Upgrade,
    LargerCauldron = new Upgrade,
    EnchantedCauldron = new Upgrade,
    ReinforcedFurnace = new Upgrade,
    HotterFurnace = new Upgrade,
    CauldronUnlock = new Upgrade,
    Witch = new Upgrade,
    Blacksmith = new Upgrade,
    ConstructionOffice = new Upgrade,
    UnleadedPlus_Effect = new StoreValueUpgradeEffect(.75, Store[1] = [GasStationStore]),
    SuperUnleaded_Effect = new StoreValueUpgradeEffect(1.25, Store[1] = [GasStationStore]),
    UltraUnleaded_Effect = new StoreValueUpgradeEffect(2, Store[1] = [GasStationStore]),
    HighPressurePumps_Effect = new StoreSaleSpeedUpgradeEffect(.7, Store[1] = [GasStationStore]),
    HigherPressurePumps_Effect = new StoreSaleSpeedUpgradeEffect(1, Store[1] = [GasStationStore]),
    GasJockey_Effect = new StoreSaleSpeedUpgradeEffect(1.3, Store[1] = [GasStationStore]),
    CaffeinatedClerks_Effect = new StoreSaleQuantityUpgradeEffect(.5, Store[1] = [GasStationStore]),
    ExtraPump_Effect = new StoreSaleQuantityUpgradeEffect(1.5, Store[1] = [GasStationStore]),
    DieselPump_Effect = new StoreSaleQuantityUpgradeEffect(2.5, Store[1] = [GasStationStore]),
    UnleadedPlus = new Upgrade,
    SuperUnleaded = new Upgrade,
    UltraUnleaded = new Upgrade,
    HighPressurePumps = new Upgrade,
    HigherPressurePumps = new Upgrade,
    GasJockey = new Upgrade,
    CaffeinatedClerks = new Upgrade,
    ExtraPump = new Upgrade,
    DieselPump = new Upgrade,
    BuffSystem = function() {
        function b() {
            this.lowestUnregisteredId = 0;
            this.Name = "Buff";
            this.Reset()
        }
        b.prototype.RegisterItem =
            function(a) {
                a.SetID(this.lowestUnregisteredId);
                this.items[this.lowestUnregisteredId] = a;
                this.lowestUnregisteredId++
            };
        b.prototype.Reset = function() {
            if (this.items)
                for (var a = 0; a < this.items.length; ++a) 0 < this.items[a].RemainingTime && (this.items[a].Deactivate(), this.items[a].RemainingTime = 0);
            this.lowestUnregisteredId = 0;
            this.items = []
        };
        b.prototype.tick = function() {
            for (var a = 0; a < this.items.length; ++a) {
                var f = this.items[a];
                0 < f.RemainingTime && !f.Active && (f.Upgrade.Activate(), f.Active = !0);
                if (f.Active)
                    if (0 < f.RemainingTime) f.RemainingTime -=
                        1 * game.frameTime;
                    else {
                        f.Deactivate();
                        var b = msg.create();
                        b.type = 2;
                        b.text = "The effects of your " + f.Item.Name + " have faded.";
                        b.timeout = 5;
                        b.send()
                    }
            }
        };
        return b
    }(),
    Buff = function() {
        function b() {
            this.Active = !1;
            this.RemainingTime = 0
        }
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.SetUpgrade = function(a) {
            this.Upgrade = a;
            return this
        };
        b.prototype.SetItem = function(a) {
            this.Item = a;
            return this
        };
        b.prototype.SetDuration = function(a) {
            this.Duration = a;
            return this
        };
        b.prototype.Activate = function() {
            this.Active = !0;
            this.RemainingTime =
                this.Duration;
            this.Upgrade.Activate()
        };
        b.prototype.Deactivate = function() {
            this.Active = !1;
            this.RemainingTime = 0;
            this.Upgrade.Deactivate()
        };
        b.prototype.SetRemaining = function(a) {
            this.RemainingTime = a;
            return this
        };
        return b
    }(),
    SpeechPotionUpgrade = (new Upgrade).SetName("Speech Potion").SetDisplay(!1).SetActive(!1).AddEffect(SpeechPotion_Effect),
    ClickingPotionUpgrade = (new Upgrade).SetName("Clicking Potion").SetDisplay(!1).SetActive(!1).AddEffect(ClickingPotion_Effect),
    SmeltingPotionUpgrade = (new Upgrade).SetName("Smelting Potion").SetDisplay(!1).SetActive(!1).AddEffect(SmeltingPotion_Effect),
    AlchemyPotionUpgrade = (new Upgrade).SetName("Alchemy Potion").SetDisplay(!1).SetActive(!1).AddEffect(AlchemyPotion_Effect),
    AdblockUpgrade = (new Upgrade).SetName("Adblock Debuff").SetDisplay(!1).SetActive(!1).AddEffect(AdblockDebuff_Effect),
    SpeechPotionBuff = new Buff,
    SmeltingPotionBuff = new Buff,
    AlchemyPotionBuff = new Buff,
    ClickingPotionBuff = new Buff,
    AdblockDebuff = new Buff,
    Inventory = function() {
        function b(a) {
            this.itemSystem = a
        }
        b.prototype.trueSellAll = function() {
            for (var a = 0, f = 0, b = 0; b < this.itemSystem.items.length; ++b) this.itemSystem.items[b].DisplayInInventory &&
                (a += this.itemSystem.items[b].Quantity, f += this.itemSystem.items[b].Quantity * this.itemSystem.items[b].GetValue(), this.sellItem(this.itemSystem.items[b].ID, this.itemSystem.items[b].Quantity));
            0 < f && (b = msg.create(), b.type = 2, b.text = "You sold " + formatNumber(a) + " resources worth " + formatNumber(f) + " coins.", b.timeout = 5, b.send())
        };
        b.prototype.sellAll = function() {
            for (var a = !1, b = 0, e = 0, d = 0; d < this.itemSystem.items.length; ++d) this.itemSystem.items[d].DisplayInInventory && game.inventoryUI.itemSellIsChecked(this.itemSystem.items[d].ID.toString()) &&
                (a = !0, b += this.itemSystem.items[d].Quantity, e += this.itemSystem.items[d].Quantity * this.itemSystem.items[d].GetValue(), this.sellItem(this.itemSystem.items[d].ID, this.itemSystem.items[d].Quantity));
            a && (d = msg.create(), d.type = 2, d.text = "You sold " + formatNumber(b) + " resources worth " + formatNumber(e) + " coins.", d.timeout = 5, d.send());
            game.inventoryUI.update();
            a || (document.getElementById("configurationbutton").classList.contains("no-items-sold") || document.getElementById("configurationbutton").classList.add("no-items-sold"),
                d = msg.create(), d.type = 1, d.text = "You must configure the sell all items button.", d.timeout = 5, d.send())
        };
        b.prototype.consumePotion = function() {
            for (var a = 0; a < game.buffSystem.items.length; ++a) {
                var b = game.buffSystem.items[a];
                this.selectedItem === b.Item && 0 < this.selectedItem.Quantity && !b.Active && (b.Activate(), this.selectedItem.Quantity--)
            }
        };
        b.prototype.addItem = function(a) {
            this.itemSystem.LookupItem(a).Quantity++;
            this.itemSystem.LookupItem(a).Alltime++
        };
        b.prototype.addManyItems = function(a, b) {
            this.itemSystem.LookupItem(a).Quantity +=
                b;
            this.itemSystem.LookupItem(a).Alltime += b
        };
        b.prototype.addItemQuantity = function(a, b) {
            for (var e = 0; e < b; e++) this.addItem(a)
        };
        b.prototype.deductFunds = function(a) {
            return a <= Coins.Quantity ? (Coins.Quantity -= a, !0) : !1
        };
        b.prototype.checkAll = function() {
            var a = document.getElementById("configtable");
            this.checkAllRecurse(a)
        };
        b.prototype.checkAllRecurse = function(a) {
            for (var b = 0; b < a.children.length; b++) {
                var e = a.children[b];
                console.log(e);
                "INPUT" === e.nodeName && (e.checked = !0);
                this.checkAllRecurse(e)
            }
        };
        b.prototype.toggleBoxes =
            function(a) {
                var b = document.getElementsByName(a.target.name),
                    e;
                for (e in b)
                    if (b[e].id) {
                        var d = b[e].id.replace("configchecker", "");
                        0 < game.itemSystem.items[+d].Alltime && (b[e].checked = a.target.checked)
                    }
            };
        b.prototype.selectItem = function(a) {
            a = a.target;
            a.parentElement !== document.getElementById("inventory") && (a = a.parentElement);
            a.parentElement !== document.getElementById("inventory") && (a = a.parentElement);
            this.selectedItem = this.itemSystem.LookupItem(a.id.replace("item", ""));
            game.inventoryUI.updateHeader()
        };
        b.prototype.sellItem =
            function(a, b) {
                var e = this.itemSystem.LookupItem(a);
                isNaN(b) && (b = 0);
                e.Quantity < b && (b = e.Quantity);
                e.Quantity -= b;
                Coins.Quantity += b * e.GetValue();
                Coins.Alltime += b * e.GetValue()
            };
        return b
    }(),
    StatisticSystem = function() {
        function b() {
            this.lowestUnregisteredId = 0;
            this.Name = "Statistic";
            this.Reset()
        }
        b.prototype.LookupStatistic = function(a) {
            return this.items[a]
        };
        b.prototype.RegisterItem = function(a) {
            a.SetID(this.lowestUnregisteredId);
            this.items[this.lowestUnregisteredId] = a;
            this.lowestUnregisteredId++
        };
        b.prototype.Reset =
            function() {
                this.lowestUnregisteredId = 0;
                this.items = []
            };
        return b
    }(),
    Statistic = function() {
        function b() {
            this.Value = 0
        }
        b.prototype.SetValue = function(a) {
            this.Value = a;
            return this
        };
        b.prototype.SetID = function(a) {
            this.ID = a;
            return this
        };
        b.prototype.SetName = function(a) {
            this.Name = a;
            return this
        };
        return b
    }(),
    StatVersionNumber = new Statistic,
    StatRockClicked = new Statistic,
    StatTimePlayed = new Statistic,
    StatOilConsumed = new Statistic,
    StatPopulation = new Statistic,
    StatMasochism = new Statistic,
    StatGasStationOpen = new Statistic,
    CraftingUI = function(b) {
        function a(a, e, d) {
            b.call(this);
            this.headers = ["Action", "Description", "Input", "Output", "Name"];
            this.headerWidths = ["10%", "50%", "15%", "15%", "10%"];
            this.processorSystem = a;
            this.upgradeSystem = e;
            this.itemSystem = d;
            this.draw()
        }
        __extends(a, b);
        a.prototype.draw = function() {
            this.drawMachines();
            this.drawCraftingTable()
        };
        a.prototype.drawMachines = function() {
            this.processorSystem.DisplayProcessors()
        };
        a.prototype.drawCraftingTable = function() {
            var a = document.createElement("div");
            a.setAttribute("class",
                "processorpane");
            for (var b = this.drawTableHeader(), d = b.createTBody(), c = 0; c < this.upgradeSystem.items.length; ++c) 1 === this.upgradeSystem.items[c].Type && (g = d.insertRow(0), g.classList.add("table-row"), this.drawUpgradeCraftingRow(this.upgradeSystem.items[c], g));
            c = d.insertRow(0);
            c.classList.add("table-subheader");
            c = c.insertCell(0);
            c.setAttribute("colspan", this.headers.length.toString());
            c.style.height = "35px";
            c.textContent = "Upgrades";
            for (var c = 0; c < this.itemSystem.recipes.length; ++c) {
                var g = d.insertRow(0);
                g.classList.add("table-row");
                this.drawItemCraftingRow(this.itemSystem.recipes[c], g)
            }
            c = d.insertRow(0);
            c.classList.add("table-subheader");
            c = c.insertCell(0);
            c.setAttribute("colspan", this.headers.length.toString());
            c.style.height = "35px";
            c.textContent = "Items";
            b.appendChild(d);
            a.appendChild(b);
            document.getElementById("tabs-Crafting").appendChild(a)
        };
        a.prototype.drawTableHeader = function() {
            var a = document.createElement("table");
            a.setAttribute("class", "processortable");
            var b = a.createTHead(),
                d = b.insertRow(0);
            d.classList.add("table-header");
            var c = d.insertCell(0);
            d.style.height = "35px";
            c.textContent = "Crafting Table";
            c.setAttribute("colspan", this.headers.length.toString());
            b.style.height = "35px";
            b = b.insertRow(1);
            b.classList.add("table-subheader");
            b.style.height = "35px";
            for (d = 0; d < this.headers.length; ++d) c = b.insertCell(0), c.style.width = this.headerWidths[d], c.textContent = this.headers[d];
            return a
        };
        a.prototype.drawUpgradeCraftingRow = function(a, b) {
            b.setAttribute("id", "upgradecraftrow" + a.ID);
            var d = b.insertCell(0),
                c = b.insertCell(0),
                g = b.insertCell(0);
            b.insertCell(0);
            var h = b.insertCell(0),
                k = "",
                l = createButton("Craft", "craftupgrade" + a.ID);
            l.addEventListener("click", function(a) {
                a = game.upgradeSystem.items[a.target.id.replace("craftupgrade", "")];
                for (var b = !0, f = 0; f < a.Recipe.inputs.length; ++f) a.Recipe.inputs[f].item.Quantity < a.Recipe.inputs[f].quantity && (b = !1);
                if (b) {
                    for (f = 0; f < a.Recipe.inputs.length; ++f) a.Recipe.inputs[f].item.Quantity -= a.Recipe.inputs[f].quantity;
                    game.upgradeSystem.Purchase(a.ID)
                }
            }, !1);
            for (var m = document.createElement("div"), n = 0; n < a.Recipe.inputs.length; ++n) {
                g.appendChild(a.Recipe.inputs[n].sizePrefix("Third-").display("upgrade" +
                    a.ID + "input" + n));
                var q = document.createElement("div"),
                    s = document.createElement("span"),
                    r = document.createElement("div");
                r.classList.add("crafting-tooltip");
                r.id = "upgradeitemquantity" + a.ID + "input" + n;
                r.textContent = a.Recipe.inputs[n].item.Quantity.toString();
                s.textContent = "/" + formatNumber(a.Recipe.inputs[n].quantity) + " " + a.Recipe.inputs[n].item.Name;
                q.appendChild(r);
                q.appendChild(s);
                m.appendChild(q);
                k = k.concat(formatNumber(a.Recipe.inputs[n].quantity) + " " + a.Recipe.inputs[n].item.Name + " ")
            }
            tooltip.complexCreate(g,
                m);
            h.textContent = a.Name;
            c.textContent = a.GetTooltip();
            d.appendChild(l)
        };
        a.prototype.drawItemCraftingRow = function(a, b) {
            var d = b.insertCell(0),
                c = b.insertCell(0),
                g = b.insertCell(0),
                h = b.insertCell(0),
                k = b.insertCell(0),
                l = document.createElement("div"),
                m = document.createElement("div"),
                n = createButton("Craft", "craftrecipe" + a.ID);
            n.addEventListener("click", function(a) {
                a = game.itemSystem.recipes[a.target.id.replace("craftrecipe", "")];
                for (var b = !0, f = 0; f < a.inputs.length; ++f) a.inputs[f].item.Quantity < a.inputs[f].quantity &&
                    (b = !1);
                if (b) {
                    for (f = 0; f < a.inputs.length; ++f) a.inputs[f].item.Quantity -= a.inputs[f].quantity;
                    for (f = 0; f < a.outputs.length; ++f) game.inventory.addItemQuantity(a.outputs[f].item.ID, a.outputs[f].quantity);
                    a.outputs[0].item === TNT && StatMasochism.Value++
                }
            }, !1);
            n.style.marginLeft = "0";
            var q = createButton("Craft-X", "craftmanyrecipe" + a.ID);
            q.addEventListener("click", function(a) {
                a = game.itemSystem.recipes[a.target.id.replace("craftmanyrecipe", "")];
                var b = +document.getElementById("craftmanytext" + a.ID).value;
                isNaN(b) &&
                    (b = 0);
                0 > b && (b = 0);
                for (var f = !0, e = 0; e < a.inputs.length; ++e) a.inputs[e].item.Quantity < a.inputs[e].quantity * b && (f = !1);
                if (f) {
                    for (e = 0; e < a.inputs.length; ++e) a.inputs[e].item.Quantity -= a.inputs[e].quantity * b;
                    for (e = 0; e < a.outputs.length; ++e) game.inventory.addItemQuantity(a.outputs[e].item.ID, a.outputs[e].quantity * b)
                }
            }, !1);
            q.style.marginRight = "0";
            var s = document.createElement("input");
            s.type = "text";
            s.id = "craftmanytext" + a.ID;
            s.style.maxWidth = "25px";
            for (var r = 0; r < a.outputs.length; ++r) {
                h.appendChild(a.outputs[r].sizePrefix("Third-").display(""));
                var t = document.createElement("div");
                t.textContent = formatNumber(a.outputs[r].quantity) + " " + a.outputs[r].item.Name;
                m.appendChild(t)
            }
            tooltip.complexCreate(h, m);
            for (r = 0; r < a.inputs.length; ++r) g.appendChild(a.inputs[r].sizePrefix("Third-").display("recipe" + a.ID + "id" + r)), t = document.createElement("div"), h = document.createElement("div"), h.classList.add("crafting-tooltip"), h.id = "itemcraftingquantity" + a.ID + "input" + r, m = document.createElement("span"), m.textContent = "/" + formatNumber(a.inputs[r].quantity) + " " + a.inputs[r].item.Name,
                t.appendChild(h), t.appendChild(m), l.appendChild(t);
            tooltip.complexCreate(g, l);
            k.textContent = a.outputs[0].item.Name;
            c.textContent = "";
            d.appendChild(n);
            d.appendChild(q);
            d.appendChild(s)
        };
        a.prototype.update = function() {
            for (var a = 0; a < this.upgradeSystem.items.length; ++a) {
                var b = this.upgradeSystem.items[a];
                if (1 === b.Type) {
                    for (var d = document.getElementById("upgradecraftrow" + a), c = k = 0; c < b.Recipe.inputs.length; ++c) {
                        var g = b.Recipe,
                            h = document.getElementById("upgradeitemquantity" + b.ID + "input" + c);
                        h && (h.textContent =
                            formatNumber(b.Recipe.inputs[c].item.Quantity), h.style.width = "auto", h = h.getBoundingClientRect(), h = h.right - h.left, h > k && (k = h));
                        document.getElementById("upgrade" + b.ID + "input" + c).style.color = g.inputs[c].quantity <= g.inputs[c].item.Quantity ? "darkgreen" : "darkred"
                    }
                    if (0 < k)
                        for (c = 0; c < b.Recipe.inputs.length; ++c)
                            if (h = document.getElementById("upgradeitemquantity" + b.ID + "input" + c)) h.style.width = k + "px";
                    d.style.display = this.upgradeSystem.items[a].Active ? "none" : b.Requires ? b.Requires.Active ? "table-row" : "none" : "table-row"
                }
            }
            for (a =
                0; a < this.itemSystem.recipes.length; ++a) {
                for (var g = this.itemSystem.recipes[a], k = 0, c = 0; c < g.inputs.length; ++c) {
                    if (b = document.getElementById("itemcraftingquantity" + g.ID + "input" + c)) b.textContent = formatNumber(g.inputs[c].item.Quantity), b.style.width = "auto", h = b.getBoundingClientRect(), h = h.right - h.left, h > k && (k = h);
                    document.getElementById("recipe" + g.ID + "id" + c).style.color = g.inputs[c].quantity <= g.inputs[c].item.Quantity ? "darkgreen" : "darkred"
                }
                if (0 < k)
                    for (c = 0; c < g.inputs.length; ++c)
                        if (b = document.getElementById("itemcraftingquantity" +
                                g.ID + "input" + c)) b.style.width = k + "px"
            }
        };
        return a
    }(UI),
    EquipmentUI = function(b) {
        function a(a, e) {
            b.call(this);
            this.upgradeSystem = a;
            this.gathererSystem = e;
            this.draw()
        }
        __extends(a, b);
        a.prototype.draw = function() {
            for (var a in this.gathererSystem.items) this.gathererSystem.items[a].Display && document.getElementById("tabs-Equipment").appendChild(this.DrawGathererInfoBox(a))
        };
        a.prototype.DrawGathererInfoBox = function(a) {
            var b = document.createElement("div");
            b.setAttribute("class", "equipcont");
            var d = document.createElement("div");
            d.setAttribute("class", "equipheader");
            var c = this.gathererSystem.items[a];
            d.textContent = c.Name;
            b.appendChild(d);
            d = document.createElement("div");
            d.setAttribute("id", "quantity" + a);
            d.textContent = "Quantity: " + c.Quantity;
            var g = document.createElement("div");
            g.textContent = "Ores/tick: " + c.minePerTick;
            g.setAttribute("id", "orestick" + a);
            c = document.createElement("div");
            c.setAttribute("class", "efficiency-container");
            c.id = "efficiencycont" + a;
            var h = document.createElement("div");
            h.id = "efficiency" + a;
            h.setAttribute("class",
                "efficiency-bar");
            var k = document.createElement("span");
            k.id = "efficiencytext" + a;
            k.setAttribute("class", "efficiency-info");
            var l = createButton("");
            l.firstElementChild.id = "machinetoggle" + a;
            l.addEventListener("click", function() {
                var b = game.gathererSystem.items[a];
                b.Enabled = !b.Enabled;
                game.equipmentUI.update()
            }, !1);
            var m = document.createElement("div");
            m.id = "toggledivider" + a;
            m.style.display = "inline-block";
            var n = document.createElement("div");
            n.id = "machinerareorechance" + a;
            n.title = "Increased chance to find rare ores.";
            m.appendChild(l);
            c.appendChild(h);
            c.appendChild(k);
            b.appendChild(d);
            b.appendChild(g);
            b.appendChild(n);
            b.appendChild(c);
            b.appendChild(m);
            return b
        };
        a.prototype.update = function() {
            for (var a in this.gathererSystem.items)
                if (this.gathererSystem.items[a].Display) {
                    var b = this.gathererSystem.items[a];
                    document.getElementById("quantity" + a).textContent = "Quantity: " + b.Quantity + "/" + b.MaxOwned;
                    document.getElementById("orestick" + a).textContent = (b.miningTextOverride ? b.miningTextOverride : "Ores/tick") + ": " + (b === Player ?
                        Player.adjustedMinePerTick : Math.round(100 * this.gathererSystem.items[a].minePerTick) / 100);
                    document.getElementById("machinerareorechance" + a).textContent = "Rarity bonus: " + (100 * b.totalProbabilityModifier).toFixed(1) + "%";
                    var d = 0 < b.totalFuelConsumed,
                        c = document.getElementById("machinetoggle" + a);
                    c.textContent = b.Enabled ? "Deactivate" : "Activate";
                    c.style.display = d ? "inline-block" : "none";
                    var g = document.getElementById("efficiencycont" + a),
                        c = g.getBoundingClientRect();
                    g.style.display = d ? "block" : "none";
                    g.title = (b.fuelTank /
                        b.totalFuelConsumed * 100).toFixed(1) + "% efficiency";
                    c = g.getBoundingClientRect();
                    d = 100 * b.fuelEfficiency;
                    document.getElementById("efficiency" + a).style.width = d + "%";
                    g = document.getElementById("efficiencytext" + a);
                    g.textContent = b.fuelTank.toFixed(0) + "/" + b.totalFuelConsumed;
                    var d = g.getBoundingClientRect(),
                        h = d.right - d.left,
                        d = c.right - c.left,
                        b = d * b.fuelEfficiency;
                    b + h > d && (b = d - h - 5);
                    g.style.left = b + "px";
                    b = document.getElementById("toggledivider" + a);
                    d = b.getBoundingClientRect();
                    g = d.right - d.left;
                    d = c.right - c.left;
                    b.style.marginLeft =
                        d / 2 - g / 2 + "px"
                }
        };
        return a
    }(UI),
    AchievementSystem = function() {
        function b() {
            this.lowestUnregisteredId = 0;
            this.Name = "Achievement";
            this.Reset()
        }
        b.prototype.Reset = function() {
            this.lowestUnregisteredId = 0;
            this.items = [];
            this.toAnimate = []
        };
        b.prototype.LookupAchievement = function(a) {
            return this.items[a]
        };
        b.prototype.RegisterItem = function(a) {
            a.SetID(this.lowestUnregisteredId);
            this.items[this.lowestUnregisteredId] = a;
            this.lowestUnregisteredId++
        };
        b.prototype.Check = function() {
            for (var a = 0; a < this.items.length; ++a) {
                var b =
                    this.items[a];
                if (b.Condition.condition() && !b.Completed) {
                    b.Completed = !0;
                    ga("send", {
                        hitType: "event",
                        eventCategory: "Achievement",
                        eventAction: "Unlock",
                        eventLabel: b.Name
                    });
                    var e = msg.create();
                    e.type = 2;
                    e.text = "Achievement unlocked! " + b.Name;
                    e.timeout = 5;
                    e.send()
                }
            }
        };
        return b
    }(),
    Achievement = function() {
        function b() {
            this.Completed = !1
        }
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.SetName = function(a) {
            this.Name = a;
            return this
        };
        b.prototype.SetCondition = function(a) {
            this.Condition = a;
            return this
        };
        b.prototype.SetRequires =
            function(a) {
                this.Requires = a;
                return this
            };
        b.prototype.SetCompleted = function(a) {
            this.Completed = a;
            return this
        };
        b.prototype.GetTooltip = function() {
            return this.Condition.tooltip()
        };
        return b
    }(),
    AchievementListener = function() {
        function b() {}
        b.prototype.tooltip = function() {
            return ""
        };
        b.prototype.condition = function() {};
        b.prototype.getPercentage = function() {
            return 0
        };
        b.prototype.getCurrentProgress = function() {
            return 0
        };
        b.prototype.getMaxProgress = function() {
            return 0
        };
        return b
    }(),
    AchievementAlltime = function(b) {
        function a(a,
            e) {
            this.Variables = a;
            this.Requirement = e;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.tooltip = function() {
            for (var a = [], b = 0; b < this.Variables.length; ++b) a.push(this.Variables[b].Name);
            return "Have an all time total of " + formatNumber(this.Requirement) + " " + a.join(", ") + "."
        };
        a.prototype.condition = function() {
            for (var a = 0, b = 0; b < this.Variables.length; ++b) a += this.Variables[b].Alltime;
            return a >= this.Requirement ? !0 : !1
        };
        a.prototype.getPercentage = function() {
            return this.getCurrentProgress() / this.getMaxProgress()
        };
        a.prototype.getCurrentProgress =
            function() {
                return this.Variables[0].Alltime
            };
        a.prototype.getMaxProgress = function() {
            return this.Requirement
        };
        return a
    }(AchievementListener),
    AchievementQuantity = function(b) {
        function a(a, e) {
            this.Variables = a;
            this.Requirement = e;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.tooltip = function() {
            for (var a = [], b = 0; b < this.Variables.length; ++b) a.push(this.Variables[b].Name);
            return "Have " + formatNumber(this.Requirement) + " " + a.join(", ") + " in your inventory."
        };
        a.prototype.condition = function() {
            for (var a = 0, b = 0; b < this.Variables.length; ++b) a +=
                this.Variables[b].Quantity;
            return a >= this.Requirement ? !0 : !1
        };
        a.prototype.getPercentage = function() {
            return this.Variables[0].Quantity / this.Requirement
        };
        a.prototype.getCurrentProgress = function() {
            return this.Variables[0].Quantity
        };
        a.prototype.getMaxProgress = function() {
            return this.Requirement
        };
        return a
    }(AchievementListener),
    AchievementItemType = function(b) {
        function a(a) {
            this.ItemType = a;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.tooltip = function() {
            return "Discover every type of " + ItemType[this.ItemType] + "."
        };
        a.prototype.condition = function() {
            for (var a = 0; a < game.itemSystem.items.length; ++a) {
                var b = game.itemSystem.items[a];
                if (b.Type === this.ItemType && 0 >= b.Alltime) return !1
            }
            return !0
        };
        a.prototype.getPercentage = function() {
            for (var a = 0, b = 0, d = 0; d < game.itemSystem.items.length; ++d) {
                var c = game.itemSystem.items[d];
                c.Type === this.ItemType && (a++, 0 < c.Alltime && b++)
            }
            return b / a
        };
        a.prototype.getCurrentProgress = function() {
            for (var a = 0, b = 0; b < game.itemSystem.items.length; ++b) {
                var d = game.itemSystem.items[b];
                d.Type === this.ItemType &&
                    0 < d.Alltime && a++
            }
            return a
        };
        a.prototype.getMaxProgress = function() {
            for (var a = 0, b = 0; b < game.itemSystem.items.length; ++b) game.itemSystem.items[b].Type === this.ItemType && a++;
            return a
        };
        return a
    }(AchievementListener),
    AchievementStatistic = function(b) {
        function a(a, e) {
            this.Variable = a;
            this.Requirement = e;
            b.call(this)
        }
        __extends(a, b);
        a.prototype.tooltip = function() {
            return this.TooltipOverride ? this.TooltipOverride : formatNumber(this.Requirement) + " " + this.Variable.Name
        };
        a.prototype.setTooltipOverride = function(a) {
            this.TooltipOverride =
                a;
            return this
        };
        a.prototype.condition = function() {
            return this.Variable.Value >= this.Requirement ? !0 : !1
        };
        a.prototype.getPercentage = function() {
            return this.Variable.Value / this.Requirement
        };
        a.prototype.getCurrentProgress = function() {
            return this.Variable.Value
        };
        a.prototype.getMaxProgress = function() {
            return this.Requirement
        };
        return a
    }(AchievementListener),
    AchMoney1 = new Achievement,
    AchMoney2 = new Achievement,
    AchMoney3 = new Achievement,
    AchMiner1 = new Achievement,
    AchMiner2 = new Achievement,
    AchMiner3 = new Achievement,
    AchItemCatOre = new Achievement,
    AchItemCatGem = new Achievement,
    AchItemCatCrafting = new Achievement,
    AchItemCatIngredient = new Achievement,
    AchItemCatPotion = new Achievement,
    AchTimePlayed5m = new Achievement,
    AchTimePlayed1h = new Achievement,
    AchTimePlayed6h = new Achievement,
    AchTimePlayed24h = new Achievement,
    AchTimePlayed7d = new Achievement,
    AchTimePlayed30d = new Achievement,
    AchOil1 = new Achievement,
    AchOil2 = new Achievement,
    AchOil3 = new Achievement,
    AchStone1 = new Achievement,
    AchStone2 = new Achievement,
    AchStone3 = new Achievement,
    AchMasochist = new Achievement,
    StatisticsUI = function(b) {
        function a(a) {
            b.call(this);
            this.headers = ["Alltime collected", "Item"];
            this.headerWidths = ["85%", "15%"];
            this.itemSystem = a;
            this.draw()
        }
        __extends(a, b);
        a.prototype.draw = function() {
            var a = document.createElement("div");
            a.style.width = "45%";
            a.style.margin = "2%";
            a.appendChild(this.DrawItemStatsTable());
            document.getElementById("tabs-Statistics").appendChild(a)
        };
        a.prototype.DrawItemStatsHeader = function() {
            var a = document.createElement("table");
            a.setAttribute("class",
                "processortable");
            var b = a.createTHead(),
                d = b.insertRow(0);
            d.classList.add("table-header");
            var c = d.insertCell(0);
            d.style.height = "35px";
            c.textContent = "Statistics";
            c.setAttribute("colspan", this.headers.length.toString());
            b.style.height = "35px";
            b = b.insertRow(1);
            b.style.height = "35px";
            b.classList.add("table-subheader");
            for (d = 0; d < this.headers.length; ++d) c = b.insertCell(0), c.style.width = this.headerWidths[d], c.textContent = this.headers[d];
            return a
        };
        a.prototype.DrawItemStatsTable = function() {
            for (var a = this.DrawItemStatsHeader(),
                    b = a.createTBody(), d = 0; d < this.itemSystem.items.length; ++d) {
                var c = this.itemSystem.items[d];
                if (c.DisplayInInventory) {
                    var g = b.insertRow(b.rows.length);
                    g.classList.add("table-row");
                    var h = g.insertCell(0),
                        k = g.insertCell(0);
                    h.setAttribute("id", "statsitemalltime" + d);
                    tooltip.create(k, c.Name);
                    var l = document.createElement("img");
                    l.src = "/Images/hack.png";
                    l.classList.add("Third-" + c.Name.replace(" ", "_"));
                    g.style.maxHeight = "18px";
                    k.appendChild(l);
                    h.textContent = c.Alltime.toString()
                }
            }
            return a
        };
        a.prototype.update =
            function() {
                this.UpdateItemStatsTable()
            };
        a.prototype.UpdateItemStatsTable = function() {
            for (var a = 0; a < this.itemSystem.items.length; ++a) this.itemSystem.items[a].DisplayInInventory && (document.getElementById("statsitemalltime" + a).textContent = formatNumber(this.itemSystem.items[a].Alltime))
        };
        return a
    }(UI),
    HeaderUI = function(b) {
        function a(a) {
            b.call(this);
            this.iexportScreen = this.resetScreen = !1;
            this.data = a;
            this.eventHandlers();
            this.draw()
        }
        __extends(a, b);
        a.prototype.toggleReset = function() {
            var a = this.resetScreen;
            this.closeAll();
            this.resetScreen = !a;
            this.update()
        };
        a.prototype.toggleIExport = function() {
            var a = this.iexportScreen;
            this.closeAll();
            this.iexportScreen = !a;
            this.update();
            this.refreshExportData()
        };
        a.prototype.closeAll = function() {
            this.iexportScreen = this.resetScreen = !1
        };
        a.prototype.eventHandlers = function() {
            document.getElementById("headerreset").addEventListener("click", function() {
                var a = new modal.Window,
                    b = document.createElement("span");
                b.textContent = "Are you SURE you want to reset? Your save will be completely wiped.";
                a.addElement(b);
                a.title = "Reset";
                a.addNegativeOption("No").addEventListener("click", function() {
                    modal.close()
                }, !1);
                a.addAffirmativeOption("Yes").addEventListener("click", function() {
                    data.initializeData();
                    modal.close()
                }, !1);
                a.show()
            }, !1);
            document.getElementById("headerimportexport").addEventListener("click", function() {
                var a = new modal.Window;
                a.title = "Import/Export";
                a.container.style.maxWidth = "700px";
                a.container.style.width = "700px";
                var b = document.createElement("div");
                b.id = "exportPane";
                b.classList.add("export-pane");
                var d = document.createElement("div");
                d.classList.add("import-pane");
                var c = document.createElement("textarea");
                c.classList.add("textareafill");
                c.id = "importPane";
                d.appendChild(c);
                a.addElement(b);
                a.addElement(d);
                a.addAffirmativeOption("Import").addEventListener("click", function() {
                    data.importSave(document.getElementById("importPane").value);
                    modal.close()
                }, !1);
                a.addOption("Refresh Export").addEventListener("click", function() {
                    game.headerUI.refreshExportData()
                }, !1);
                a.show();
                game.headerUI.refreshExportData()
            }, !1)
        };
        a.prototype.draw = function() {
            document.getElementById("headersave").addEventListener("click", function() {
                data.save();
                lastSave = 0
            }, !1)
        };
        a.prototype.update = function() {};
        a.prototype.refreshExportData = function() {
            document.getElementById("exportPane").textContent = localStorage.getItem("save")
        };
        return a
    }(UI),
    AchievementUI = function(b) {
        function a(a) {
            b.call(this);
            this.attached = !1;
            this.achievementSystem = a;
            this.draw()
        }
        __extends(a, b);
        a.prototype.draw = function() {
            for (var a = 0; a < this.achievementSystem.items.length; ++a) {
                var b =
                    document.createElement("div"),
                    d = document.createElement("div"),
                    c = document.createElement("span"),
                    g = this.achievementSystem.items[a],
                    h = document.createElement("div"),
                    k = document.createElement("div");
                k.textContent = g.GetTooltip();
                k.id = "achievementdescription" + a;
                h.appendChild(k);
                k = document.createElement("div");
                k.classList.add("achievement-progress-container");
                var l = document.createElement("div");
                l.classList.add("achievement-progress-bar");
                l.id = "achievementprogress" + a;
                k.appendChild(l);
                h.appendChild(k);
                l = document.createElement("div");
                l.id = "achievementprogresstext" + a;
                l.classList.add("achievement-progress-text");
                k.appendChild(l);
                tooltip.complexCreate(b, h);
                b.classList.add("achievement");
                b.id = "achievementcontainer" + a;
                d.classList.add("achievement-image");
                d.id = "achievementimage" + a;
                c.classList.add("achievement-text");
                c.textContent = g.Name;
                c.id = "achievementtext" + a;
                b.appendChild(d);
                b.appendChild(c);
                document.getElementById("tabs-Achievements").appendChild(b)
            }
        };
        a.prototype.update = function() {
            for (var a = 0; a < this.achievementSystem.items.length; ++a) {
                var b =
                    document.getElementById("achievementcontainer" + a);
                document.getElementById("achievementimage" + a);
                var d = document.getElementById("achievementtext" + a),
                    c = this.achievementSystem.items[a],
                    g = document.getElementById("achievementprogress" + a);
                g && (g.style.width = 100 * Math.min(c.Condition.getPercentage(), 1) + "%", g.parentElement.style.display = c.Requires ? c.Requires.Completed ? "block" : "none" : "block");
                if (g = document.getElementById("achievementdescription" + a)) g.textContent = c.Requires ? c.Requires.Completed ? c.GetTooltip() :
                    "???" : c.GetTooltip();
                if (g = document.getElementById("achievementprogresstext" + a)) g.textContent = (c.Completed ? formatNumber(c.Condition.getMaxProgress()) : formatNumber(Math.floor(c.Condition.getCurrentProgress()))) + "/" + formatNumber(c.Condition.getMaxProgress());
                c.Requires && (d.textContent = c.Requires.Completed ? c.Name : "???");
                c.Completed && !b.classList.contains("active") ? b.classList.add("active") : !c.Completed && b.classList.contains("active") && b.classList.remove("active")
            }
        };
        return a
    }(UI),
    PrestigeSystem = function() {
        function b() {
            this.lowestUnregisteredId =
                0;
            this.Name = "Prestige";
            this.Reset()
        }
        b.prototype.Reset = function() {
            if (this.items)
                for (var a = 0; a < this.items.length; ++a)
                    if (this.items[a].Active)
                        for (var b = 0; b < this.items[a].Rewards.length; ++b) this.items[a].Rewards[b].Effect[0].deactivate();
            this.lowestUnregisteredId = 0;
            this.items = []
        };
        b.prototype.RegisterItem = function(a) {
            a.SetID(this.lowestUnregisteredId);
            this.items[this.lowestUnregisteredId] = a;
            this.lowestUnregisteredId++;
            this.HighestPrestige = a
        };
        b.prototype.ActivateRewards = function() {
            for (var a = 0; a < this.items.length; ++a) {
                var b =
                    this.items[a];
                if (b.Active)
                    for (var e = 0; e < b.Rewards.length; ++e) b.Rewards[e].Activate()
            }
        };
        b.prototype.CheckRequirements = function(a) {
            for (var b = !0, e = 0; e < a.Requirements.length; ++e) a.Requirements[e].Condition.condition() || (b = !1);
            return b
        };
        b.prototype.Prestige = function(a) {
            this.CheckRequirements(a) && (a.Active = !0, data.softReset(), this.ActivateRewards(), game.prestigeUI.draw(), ga("send", {
                hitType: "event",
                eventCategory: "Prestige",
                eventAction: "Unlock",
                eventLabel: a.Item.Name
            }))
        };
        b.prototype.GetHighestPrestige = function() {
            for (var a =
                    0; a < this.items.length; ++a)
                if (a === this.items.length - 1 || this.items[a].Active && !this.items[a + 1].Active) return this.items[a]
        };
        return b
    }(),
    Prestige = function() {
        function b() {
            this.Active = !1;
            this.Rewards = [];
            this.Requirements = []
        }
        b.prototype.SetID = function(a) {
            this.ID = a
        };
        b.prototype.SetActive = function(a) {
            this.Active = a;
            return this
        };
        b.prototype.SetItem = function(a) {
            this.Item = a;
            return this
        };
        b.prototype.AddRequirements = function(a) {
            this.Requirements = [];
            this.Requirements = this.Requirements.concat(this.Requirements, a);
            return this
        };
        b.prototype.AddRewards = function(a) {
            this.Rewards = [];
            this.Rewards = this.Rewards.concat(this.Rewards, a);
            return this
        };
        return b
    }(),
    StonePrestige = new Prestige,
    CopperPrestigeStoneReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Stone], 2E7)),
    CopperPrestigeLumberReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Logs], 1E6)),
    CopperPrestigeTitBarReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Titanium_bar], 100)),
    CopperPrestigePopulationReq = (new Achievement).SetCondition((new AchievementStatistic(StatPopulation,
        2500)).setTooltipOverride("Have a total population of 2,500.")),
    CopperPrestigeCoinsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Coins], 1E10)),
    CopperPrestigeDiamondsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Diamond], 50)),
    CopperPrestigeValueUpgrade = (new Upgrade).AddEffect(new ItemValueUpgradeEffect(.15)),
    CopperPrestigeClickingUpgrade = (new Upgrade).AddEffect(new EfficiencyMagnitudeUpgradeEffect(1, Gatherer[1] = [Player])),
    CopperPrestigeProcessorUpgrade = (new Upgrade).AddEffect(new ManufacturerEfficiencyUpgradeEffect(.5,
        Processor[2] = [Furnace, Cauldron])),
    CopperPrestige = new Prestige,
    IronPrestigeStoneReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Stone], 5E7)),
    IronPrestigeLumberReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Logs], 2E6)),
    IronPrestigeTitBarReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Titanium_bar], 250)),
    IronPrestigePopulationReq = (new Achievement).SetCondition((new AchievementStatistic(StatPopulation, 1E4)).setTooltipOverride("Have a total population of 10,000.")),
    IronPrestigeCoinsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Coins], 25E9)),
    IronPrestigeDiamondsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Diamond], 100)),
    IronPrestigeMachineUpgrade = (new Upgrade).AddEffect(new EfficiencyMagnitudeUpgradeEffect(.1, Gatherer[5] = [Miner, Drill, Crusher, Excavator, MegaDrill])),
    IronPrestigeOilUpgrade = (new Upgrade).AddEffect(new EfficiencyMagnitudeUpgradeEffect(.2, Gatherer[2] = [Pumpjack, BigTexan])),
    IronPrestigeProcessorUpgrade = (new Upgrade).AddEffect(new StoreValueUpgradeEffect(1.75,
        Store[2] = [GasStationStore])),
    IronPrestige = new Prestige,
    SilverPrestigeStoneReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Stone], 1E8)),
    SilverPrestigeLumberReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Logs], 5E6)),
    SilverPrestigeTitBarReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Titanium_bar], 500)),
    SilverPrestigePopulationReq = (new Achievement).SetCondition((new AchievementStatistic(StatPopulation, 25E3)).setTooltipOverride("Have a total population of 25,000.")),
    SilverPrestigeCoinsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Coins], 5E10)),
    SilverPrestigeDiamondsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Diamond], 250)),
    SilverPrestigeValueUpgrade = (new Upgrade).AddEffect(new ManufacturerEfficiencyUpgradeEffect(.75, Processor[2] = [Furnace, Cauldron])),
    SilverPrestigeProcessorUpgrade = (new Upgrade).AddEffect(new ManufacturerOutputModifierUpgradeEffect(1, Processor[1] = [Furnace])),
    SilverPrestigeLumberjackUpgrade = (new Upgrade).AddEffect(new EfficiencyUpgradeEffect(2,
        Gatherer[1] = [Lumberjack])),
    SilverPrestige = new Prestige,
    GoldPrestigeStoneReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Stone], 15E7)),
    GoldPrestigeLumberReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Logs], 75E5)),
    GoldPrestigeTitBarReq = (new Achievement).SetCondition(new AchievementAlltime(Item[1] = [Titanium_bar], 750)),
    GoldPrestigePopulationReq = (new Achievement).SetCondition((new AchievementStatistic(StatPopulation, 5E4)).setTooltipOverride("Have a total population of 50,000.")),
    GoldPrestigeCoinsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Coins], 1E11)),
    GoldPrestigeDiamondsReq = (new Achievement).SetCondition(new AchievementQuantity(Item[1] = [Diamond], 400)),
    GoldPrestigeValueUpgrade = (new Upgrade).AddEffect(new ItemValueUpgradeEffect(.25)),
    GoldPrestigeClickUpgrade = (new Upgrade).AddEffect(new EfficiencyMagnitudeUpgradeEffect(2, Gatherer[1] = [Player])),
    GoldPrestigeProcessorUpgrade = (new Upgrade).AddEffect(new EfficiencyMagnitudeUpgradeEffect(.25, Gatherer[5] = [Miner, Drill, Crusher, Excavator, MegaDrill])),
    GoldPrestige = new Prestige,
    PrestigeUI = function(b) {
        function a(a) {
            b.call(this);
            this.prestigeSystem = a;
            this.draw()
        }
        __extends(a, b);
        a.prototype.draw = function() {
            for (var a = document.getElementById("tabs-Prestige"); a.firstChild;) a.removeChild(a.firstChild);
            var b = document.createElement("div"),
                d = document.createElement("div"),
                c = document.createElement("div"),
                g = document.createElement("div"),
                h = document.createElement("button");
            b.id = "currentprestigepanel";
            b.style.height = "75px";
            b.style.width = "95%";
            b.style.position = "relative";
            b.style.margin = "auto";
            b.style.border = "1px solid black";
            b.style.borderRadius = "10px";
            var k = document.createElement("span");
            k.id = "currentprestigetext";
            k.style.marginLeft = "40%";
            k.style.marginTop = "17px";
            k.style.fontSize = "30px";
            k.style.display = "inline-block";
            var l = document.createElement("img");
            l.id = "currentprestigeimage";
            l.setAttribute("class", "inventoryheaderimg");
            b.appendChild(l);
            b.appendChild(k);
            a.appendChild(b);
            if (this.prestigeSystem.GetHighestPrestige() !==
                this.prestigeSystem.HighestPrestige) {
                a.appendChild(document.createElement("br"));
                var m = this.prestigeSystem.items[this.prestigeSystem.GetHighestPrestige().ID + 1];
                c.id = "nextprestigerequirements";
                c.style.width = "95%";
                c.style.position = "relative";
                c.style.margin = "auto";
                c.style.border = "1px solid black";
                c.style.borderRadius = "10px";
                b = document.createElement("table");
                b.style.width = "100%";
                b.style.border = "none";
                k = b.createTHead();
                k = k.insertRow(0);
                k.style.textAlign = "center";
                k.style.fontSize = "30px";
                k.textContent = "Requirements for " +
                    m.Item.Name + " tier";
                for (var l = b.createTBody(), n = 0; n < m.Requirements.length; ++n) {
                    var q = m.Requirements[n],
                        k = l.insertRow(l.rows.length),
                        s = document.createElement("div"),
                        r = document.createElement("span"),
                        t = document.createElement("div");
                    s.style.position = "relative";
                    s.style.height = "30px";
                    t.id = "prestigereqprog" + n;
                    t.style.height = "18px";
                    t.style.border = "solid black 1px";
                    t.style.position = "absolute";
                    t.style.top = "3px";
                    k.style.textAlign = "center";
                    k.style.fontSize = "18px";
                    r.id = "prestigereq" + n;
                    r.textContent = q.GetTooltip();
                    r.style.zIndex = "1";
                    r.style.position = "absolute";
                    r.style.left = "0";
                    r.style.right = "0";
                    s.appendChild(r);
                    s.appendChild(t);
                    k.appendChild(s)
                }
                c.appendChild(b);
                a.appendChild(c);
                a.appendChild(document.createElement("br"));
                g.id = "nextprestigerewards";
                g.style.width = "95%";
                g.style.position = "relative";
                g.style.margin = "auto";
                g.style.border = "1px solid black";
                g.style.borderRadius = "10px";
                b = document.createElement("table");
                b.style.width = "100%";
                b.style.border = "none";
                k = b.createTHead();
                k = k.insertRow(0);
                k.style.textAlign = "center";
                k.style.fontSize = "30px";
                k.textContent = "Rewards for " + m.Item.Name + " tier";
                l = b.createTBody();
                for (c = 0; c < m.Rewards.length; ++c) n = m.Rewards[c], k = l.insertRow(l.rows.length), k.style.textAlign = "center", k.style.fontSize = "18px", k.textContent = n.GetTooltip();
                g.appendChild(b);
                a.appendChild(g);
                a.appendChild(document.createElement("br"));
                h.id = "nextprestigebutton";
                h.style.width = "95%";
                h.style.position = "relative";
                h.style.margin = "auto";
                h.style.border = "1px solid black";
                h.style.borderRadius = "10px";
                h.textContent = "PRESTIGE";
                h.style.height = "40px";
                h.addEventListener("click", function() {
                    var a = new modal.Window;
                    a.title = "Prestige";
                    var b = document.createElement("span");
                    b.textContent = "Are you sure you want to prestige? You will lose all of your items, workers and upgrades in exchange for some permanent bonuses for your future playthroughs.";
                    a.addElement(b);
                    a.addNegativeOption("No").addEventListener("click", function() {
                        modal.close()
                    }, !1);
                    a.addAffirmativeOption("Yes").addEventListener("click", function() {
                        game.prestigeSystem.Prestige(m);
                        modal.close()
                    }, !1);
                    a.show()
                }, !1);
                a.appendChild(h)
            }
            g = [];
            for (c = 0; c < this.prestigeSystem.items.length; ++c)
                if (this.prestigeSystem.items[c].Active)
                    for (h = 0; h < this.prestigeSystem.items[c].Rewards.length; ++h) g.push(this.prestigeSystem.items[c].Rewards[h]);
            if (0 < g.length) {
                a.appendChild(document.createElement("br"));
                d.style.width = "95%";
                d.style.position = "relative";
                d.style.margin = "auto";
                d.style.border = "1px solid black";
                d.style.borderRadius = "10px";
                b = document.createElement("table");
                b.style.width = "100%";
                b.style.border =
                    "none";
                k = b.createTHead();
                k = k.insertRow(0);
                k.style.textAlign = "center";
                k.style.fontSize = "30px";
                k.textContent = "Prestige Rewards";
                l = b.createTBody();
                for (c = 0; c < g.length; ++c) n = g[c], k = l.insertRow(l.rows.length), k.style.textAlign = "center", k.style.fontSize = "18px", k.textContent = n.GetTooltip();
                d.appendChild(b);
                a.appendChild(d)
            }
            this.update()
        };
        a.prototype.update = function() {
            document.getElementById("currentprestigetext").textContent = this.prestigeSystem.GetHighestPrestige().Item.Name + " tier";
            document.getElementById("currentprestigeimage").src =
                "Images/hack.png";
            document.getElementById("currentprestigeimage").setAttribute("class", "inventoryheaderimg " + this.prestigeSystem.GetHighestPrestige().Item.Name.replace(" ", "_"));
            if (this.prestigeSystem.GetHighestPrestige() !== this.prestigeSystem.HighestPrestige) {
                for (var a = this.prestigeSystem.items[this.prestigeSystem.GetHighestPrestige().ID + 1], b = 0; b < a.Requirements.length; ++b) {
                    var d = document.getElementById("prestigereq" + b),
                        c = a.Requirements[b],
                        g = document.getElementById("prestigereqprog" + b),
                        h = Math.min(100,
                            Math.max(100 * c.Condition.getPercentage(), 0));
                    g.style.width = h + "%";
                    g.style.display = 0 < h ? "block" : "none";
                    g.style.backgroundColor = 40 < h ? 100 > h ? "#FFC200" : "green" : "red";
                    d.textContent = c.GetTooltip()
                }
                document.getElementById("nextprestigebutton").style.display = this.prestigeSystem.CheckRequirements(a) ? "block" : "none"
            }
        };
        return a
    }(UI),
    TabSystem = function() {
        function b() {
            this.selectedTab = this.lowestUnregisteredId = 0;
            this.tabPadding = 40;
            this.reset()
        }
        b.prototype.reset = function() {
            this.tabContent = document.getElementById("tab-content");
            this.tabHeader = document.getElementById("tab-header");
            this.header = document.getElementById("header");
            this.items = [];
            this.selectedTab = this.lowestUnregisteredId = 0
        };
        b.prototype.registerItem = function(a) {
            a.id = this.lowestUnregisteredId;
            a.addListeners();
            this.items.push(a);
            tooltip.create(a.button, a.button.children[0].classList.toString());
            this.lowestUnregisteredId++
        };
        b.prototype.update = function() {
            for (var a = 0; a < this.items.length; ++a) {
                var b = this.items[a];
                b.requires && (b.button.style.display = b.requires.Active ? "inline-block" :
                    "none");
                if (b.id === this.selectedTab) {
                    b.panel.style.display = "block";
                    b.ui.update();
                    var e = 140 + this.tabHeader.scrollHeight + 10,
                        d = b.panel.scrollHeight + this.tabPadding;
                    d > window.innerHeight - e && (d = window.innerHeight - e);
                    this.tabContent.style.maxHeight = d + "px";
                    this.tabContent.style.minHeight = d + "px";
                    this.tabContent.style.overflowY = d >= window.innerHeight - e ? "scroll" : "hidden";
                    b.button.classList.contains("tab-inactive") && b.button.classList.remove("tab-inactive");
                    b.button.classList.contains("tab-active") || b.button.classList.add("tab-active")
                } else b.panel.style.display =
                    "none", b.button.classList.contains("tab-inactive") || b.button.classList.add("tab-inactive"), b.button.classList.contains("tab-active") && b.button.classList.remove("tab-active")
            }
        };
        return b
    }(),
    CityTabSystem = function() {
        function b() {
            this.selectedTab = this.lowestUnregisteredId = 0;
            this.reset()
        }
        b.prototype.registerItem = function(a) {
            this.items.push(a);
            a.id = this.lowestUnregisteredId;
            a.button.addEventListener("click", function() {
                game.citySystem.cityTabs.selectedTab = a.id;
                game.citySystem.cityTabs.update()
            }, !1);
            this.lowestUnregisteredId++
        };
        b.prototype.reset = function() {
            this.items || (this.items = []);
            this.selectedTab = 0
        };
        b.prototype.update = function() {
            for (var a = 0; a < this.items.length; ++a) {
                var b = this.items[a];
                b.requires && (b.button.style.display = b.requires.Active ? "block" : "none");
                b.id === this.selectedTab ? (b.panel.style.display = "block", b.ui.update(), b.button.classList.contains("city-tab-inactive") && b.button.classList.remove("city-tab-inactive"), b.button.classList.contains("city-tab-active") || b.button.classList.add("city-tab-active")) : (b.panel.style.display =
                    "none", b.button.classList.contains("city-tab-inactive") || b.button.classList.add("city-tab-inactive"), b.button.classList.contains("city-tab-active") && b.button.classList.remove("city-tab-active"))
            }
        };
        return b
    }(),
    Tab = function() {
        function b(a, b) {
            this.panel = a;
            this.button = b
        }
        b.prototype.setRequires = function(a) {
            this.requires = a;
            return this
        };
        b.prototype.addListeners = function() {
            var a = this.id;
            this.button.addEventListener("click", function() {
                game.tabSystem.selectedTab = a;
                game.tabSystem.update()
            }, !1)
        };
        return b
    }(),
    InventoryTab = new Tab(document.getElementById("tabs-Inventory"), document.getElementById("inventory-selector")),
    EquipmentTab = new Tab(document.getElementById("tabs-Equipment"), document.getElementById("equipment-selector")),
    StatisticsTab = new Tab(document.getElementById("tabs-Statistics"), document.getElementById("statistics-selector")),
    StoreTab = new Tab(document.getElementById("tabs-Store"), document.getElementById("store-selector")),
    CraftingTab = new Tab(document.getElementById("tabs-Crafting"), document.getElementById("crafting-selector")),
    AchievementsTab = new Tab(document.getElementById("tabs-Achievements"), document.getElementById("achievements-selector")),
    PrestigeTab = new Tab(document.getElementById("tabs-Prestige"), document.getElementById("prestige-selector")),
    CityTab = (new Tab(document.getElementById("tabs-City"), document.getElementById("city-selector"))).setRequires(ConstructionOffice),
    GasStationUI = function(b) {
        function a(a, e) {
            b.call(this);
            this.store = GasStationStore;
            this.upgradeSystem = e;
            this.city = a;
            this.upgrades = []
        }
        __extends(a, b);
        a.prototype.draw = function() {
            var a = document.createElement("div");
            a.id = "gasStationTab";
            a.classList.add("city-content");
            var b = document.createElement("div");
            b.classList.add("storecategoryheader");
            b.textContent = "Gas Station";
            a.appendChild(b);
            a.appendChild(this.drawUpgrades());
            a.appendChild(this.drawSalesInfo());
            b = document.createElement("div");
            b.classList.add("store-progress-container");
            var d = document.createElement("div");
            d.classList.add("store-progress-bar");
            d.id = "storeprogress" + this.store.id;
            b.appendChild(d);
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "storeopenclose" + this.store.id;
            b.classList.add("store-openclose-container");
            b.addEventListener("click", function() {
                GasStationStore.open = !GasStationStore.open
            }, !1);
            a.appendChild(b);
            return a
        };
        a.prototype.drawUpgrades = function() {
            var a = document.createElement("div");
            a.classList.add("storecategory");
            var b = document.createElement("div");
            b.classList.add("storecategoryheader");
            b.textContent = "Upgrades";
            a.appendChild(b);
            for (b = 0; b < this.upgradeSystem.items.length; b++) 3 ==
                this.upgradeSystem.items[b].Type && this.upgrades.push(this.upgradeSystem.items[b]);
            for (b = 0; b < this.upgrades.length; b++) a.appendChild(this.drawUpgradeBox(this.upgrades[b]));
            return a
        };
        a.prototype.drawUpgradeBox = function(a) {
            var b = document.createElement("div");
            b.classList.add("storeitemcontainer");
            b.id = "storeupgrade" + a.ID;
            var d = document.createElement("div");
            d.classList.add("storeitemheader");
            d.textContent = a.Name;
            b.appendChild(d);
            d = document.createElement("div");
            d.classList.add("store-info-box");
            var c = document.createElement("div");
            c.textContent = a.GetTooltip();
            d.appendChild(c);
            b.appendChild(d);
            d = document.createElement("div");
            d.classList.add("storeitemfooter");
            c = createButton("Buy");
            setDataset(c.children[0], "upgradeid", a.ID);
            c.addEventListener("click", function(a) {
                game.upgradeSystem.Purchase(+getDataset(a.target, "upgradeid"))
            }, !1);
            c.style.marginBottom = "5px";
            a = (new ItemQuantityPair(Coins, a.Price)).sizePrefix("Third-").display("");
            d.appendChild(c);
            d.appendChild(a);
            b.appendChild(d);
            return b
        };
        a.prototype.drawSalesInfo = function() {
            var a =
                document.createElement("div");
            a.classList.add("storecategory");
            var b = document.createElement("div");
            b.classList.add("storecategoryheader");
            b.textContent = "Sales";
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "saletime" + this.store.id;
            var d = document.createElement("span");
            d.classList.add("store-field");
            d.textContent = "Sale frequency: ";
            b.appendChild(d);
            d = document.createElement("span");
            d.id = "saletimespan" + this.store.id;
            d.classList.add("store-value");
            b.appendChild(d);
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "salequantity" + this.store.id;
            d = document.createElement("span");
            d.textContent = "Sale volume: ";
            d.classList.add("store-field");
            b.appendChild(d);
            d = document.createElement("span");
            d.id = "salequantityspan" + this.store.id;
            d.classList.add("store-value");
            b.appendChild(d);
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "unitvalue" + this.store.id;
            d = document.createElement("span");
            d.textContent = "Unit value: ";
            d.classList.add("store-field");
            b.appendChild(d);
            d = document.createElement("span");
            d.id = "unitvaluespan" +
                this.store.id;
            d.classList.add("store-value");
            b.appendChild(d);
            a.appendChild(b);
            d = document.createElement("span");
            d.id = "unitvaluebonus" + this.store.id;
            tooltip.create(d, "Population bonus.");
            d.classList.add("store-aside");
            b.appendChild(d);
            b = document.createElement("div");
            b.id = "totalsalesinfo" + this.store.id;
            d = document.createElement("span");
            d.textContent = "Selling ";
            d.classList.add("store-field");
            b.appendChild(d);
            d = document.createElement("span");
            d.id = "totalsalesinfospan" + this.store.id;
            d.classList.add("store-value");
            b.appendChild(d);
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "totalearningsinfo" + this.store.id;
            d = document.createElement("span");
            d.textContent = "Earning ";
            d.classList.add("store-field");
            b.appendChild(d);
            d = document.createElement("span");
            d.id = "totalearningsinfospan" + this.store.id;
            d.classList.add("store-value");
            b.appendChild(d);
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "soldoutstore" + this.store.id;
            b.textContent = "SOLD OUT";
            b.style.textAlign = "center";
            b.style.fontSize = "24px";
            a.appendChild(b);
            return a
        };
        a.prototype.update = function() {
            for (var a = document.getElementById("gasStationTab").getElementsByClassName("storecategory"), b = 0; b < a.length; ++b) {
                for (var d = a[b].childNodes, c = !0, g = 0; g < d.length; ++g)
                    if ("none" !== d[g].style.display && 0 !== g) {
                        c = !1;
                        break
                    }
                a[b].style.display = c ? "none" : "block"
            }
            document.getElementById("storeprogress" + this.store.id).style.width = Math.min(100 * this.store.sellPercentage, 100) + "%";
            var g = this.store.getHighestValueItem(),
                a = document.getElementById("totalearningsinfo" + this.store.id),
                b = document.getElementById("soldoutstore" + this.store.id),
                d = document.getElementById("totalsalesinfo" + this.store.id),
                c = document.getElementById("unitvalue" + this.store.id),
                h = document.getElementById("saletime" + this.store.id),
                k = document.getElementById("salequantity" + this.store.id);
            a.style.display = g ? "block" : "none";
            d.style.display = g ? "block" : "none";
            c.style.display = g ? "block" : "none";
            h.style.display = g ? "block" : "none";
            k.style.display = g ? "block" : "none";
            b.style.display = g ? "none" : "block";
            a = document.getElementById("storeopenclose" +
                this.store.id);
            a.textContent = this.store.open ? "Open" : "Closed";
            this.store.open ? (a.classList.contains("opened") || a.classList.add("opened"), a.classList.remove("closed")) : (a.classList.contains("closed") || a.classList.add("closed"), a.classList.remove("opened"));
            a = document.getElementById("totalearningsinfospan" + this.store.id);
            b = document.getElementById("totalsalesinfospan" + this.store.id);
            d = document.getElementById("saletimespan" + this.store.id);
            c = document.getElementById("salequantityspan" + this.store.id);
            h = document.getElementById("unitvaluespan" +
                this.store.id);
            k = document.getElementById("unitvaluebonus" + this.store.id);
            g && (k.textContent = "+" + (this.store.populationBonus - 1).toFixed(2) + "%", a.textContent = "$" + formatNumber(this.store.saleValue / (this.store.sellTime / 1E3)) + "/s", b.textContent = formatNumber(this.store.saleAmount / (this.store.sellTime / 1E3)) + " " + g.Name + "/s", d.textContent = formatNumber(this.store.sellTime / 1E3) + "s", c.textContent = formatNumber(this.store.saleAmount) + " units", h.textContent = "$" + formatNumber(g.Value * this.store.valueModifier));
            for (g =
                0; g < this.upgrades.length; g++) a = this.upgrades[g], document.getElementById("storeupgrade" + a.ID).style.display = a.Active ? "none" : a.Requires ? a.Requires.Active ? "inline-block" : "none" : "inline-block"
        };
        return a
    }(UI),
    UniversityUI = function(b) {
        function a(a) {
            b.call(this);
            this.city = a;
            this.employees = []
        }
        __extends(a, b);
        a.prototype.draw = function() {
            var a = document.createElement("div");
            a.id = "universityTab";
            a.classList.add("city-content");
            var b = document.createElement("div");
            b.classList.add("storecategoryheader");
            b.textContent =
                "University";
            a.appendChild(b);
            for (var b = this.drawCategory("Employees"), d = this.drawCategory("Research"), c = 0; c < this.city.researches.length; ++c) {
                var g = this.city.researches[c];
                d.appendChild(this.drawResearch(g));
                0 > this.employees.indexOf(g.employee) && (g = g.employee, this.employees.push(g), b.appendChild(this.drawEmployee(g)))
            }
            a.appendChild(this.drawConstructionQueue());
            a.appendChild(b);
            a.appendChild(d);
            return a
        };
        a.prototype.update = function() {
            for (var a = document.getElementById("universityTab").getElementsByClassName("citycategory"),
                    b = 0; b < a.length; ++b) {
                for (var d = a[b].childNodes, c = !0, g = 0; g < d.length; ++g)
                    if ("none" !== d[g].style.display && 0 !== g) {
                        c = !1;
                        break
                    }
                a[b].style.display = c ? "none" : "block"
            }
            a = document.getElementById("research-queue");
            b = [];
            d = document.getElementById("research-ongoing");
            for (g = 0; g < this.employees.length; g++) {
                var c = this.employees[g],
                    h = c.id;
                document.getElementById("universityemployeecost" + h).textContent = formatNumber(c.getPrice());
                document.getElementById("universityemployeequantity" + h).textContent = "Quantity: " + c.quantity;
                document.getElementById("universityemployeeefficiency" + h).textContent = "Efficiency: " + 100 * c.efficiency + "%"
            }
            c = [];
            if (this.city.ongoingResearch)
                for (c.push(this.city.ongoingResearch.research), g = 0; g < this.city.researchQueue.length; ++g) c.push(this.city.researchQueue[g].research);
            for (g = 0; g < this.city.researches.length; ++g) {
                var k = this.city.researches[g],
                    h = k.id;
                document.getElementById("researchpanel" + h).style.display = 0 > c.indexOf(k) && !k.Active ? "inline-block" : "none";
                for (var h = k.recipe.GetInputs(), l = 0; l < h.length; l++) {
                    var m =
                        document.getElementById("researchtooltip" + k.id + "ingredient" + l);
                    m && (m.textContent = formatNumber(h[l].item.Quantity))
                }
            }
            this.city.ongoingResearch ? (d.children[0] && (c = d.children[0].getAttribute("id"), c = c.replace("researchprojectqueue", ""), c = parseFloat(c), this.city.ongoingResearch.id !== c && d.removeChild(d.children[0])), d.children[0] || (g = this.drawQueueItem(this.city.ongoingResearch), g.classList.add("progressed"), d.appendChild(g)), d = this.city.ongoingResearch, g = d.research.employee, g = g.quantity * g.efficiency,
                c = document.getElementById("researchprojectprogress" + d.id), document.getElementById("researchprojectprogresstimer" + d.id).textContent = formatTime((d.maxProgress - d.progress) / g), c.setAttribute("value", d.progress.toString()), c.setAttribute("max", d.maxProgress.toString())) : d.children[0] && d.removeChild(d.children[0]);
            for (g = 0; g < this.city.researchQueue.length; ++g) d = this.city.researchQueue[g], b.push(d.id), c = document.getElementById("researchprojectqueue" + d.id), c || (a.appendChild(this.drawQueueItem(d)), c = document.getElementById("researchprojectqueue" +
                d.id)), d = Array.prototype.slice.call(a.children).indexOf(c), d !== g && -1 !== d && shiftElement(c, d - 1);
            for (g = 0; g < a.children.length; ++g) d = a.children[g], c = d.getAttribute("id"), c = c.replace("researchprojectqueue", ""), c = parseFloat(c), -1 === b.indexOf(c) && d.parentNode.removeChild(d);
            for (g = 0; g < this.city.researchQueue.length; ++g) b = this.city.researchQueue[g].id, a = document.getElementById("researchshiftup" + b), b = document.getElementById("researchshiftdown" + b), a.style.display = 0 === g ? "none" : "inline-block", b.style.display = g ===
                this.city.researchQueue.length - 1 ? "none" : "inline-block"
        };
        a.prototype.drawCategory = function(a) {
            var b = document.createElement("div"),
                d = document.createElement("div");
            d.classList.add("storecategoryheader");
            d.textContent = a;
            b.appendChild(d);
            b.classList.add("citycategory");
            return b
        };
        a.prototype.drawEmployee = function(a) {
            var b = document.createElement("div");
            b.classList.add("storeitemcontainer");
            var d = document.createElement("div");
            d.classList.add("storeitemheader");
            d.textContent = a.name;
            var c = document.createElement("div");
            c.classList.add("storeitemfooter");
            var g = (new ItemQuantityPair(Coins, a.getPrice())).sizePrefix("Third-").display("universityemployeecost" + a.id),
                h = createButton("Buy");
            h.style.marginBottom = "5px";
            h.addEventListener("click", function() {
                game.citySystem.hireEmployee(a.id)
            }, !1);
            var k = document.createElement("div");
            k.classList.add("store-info-box");
            var l = document.createElement("div"),
                m = document.createElement("div");
            m.id = "universityemployeequantity" + a.id;
            var n = document.createElement("div");
            n.id = "universityemployeeefficiency" +
                a.id;
            l.appendChild(m);
            l.appendChild(n);
            k.appendChild(l);
            c.appendChild(h);
            c.appendChild(g);
            b.appendChild(k);
            b.appendChild(d);
            b.appendChild(c);
            return b
        };
        a.prototype.drawResearch = function(a) {
            var b = document.createElement("div");
            b.classList.add("storeitemcontainer");
            b.id = "researchpanel" + a.id;
            var d = document.createElement("div");
            d.classList.add("storeitemheader");
            d.textContent = a.upgrade.Name;
            var c = document.createElement("div");
            c.classList.add("storeitemfooter");
            var g = a.recipe.GetInputs(),
                h = createButton("Buy");
            h.style.marginBottom = "5px";
            var k = document.createElement("div");
            k.classList.add("store-info-box");
            var l = document.createElement("div"),
                m = document.createElement("div");
            m.textContent = a.upgrade.GetTooltip();
            l.appendChild(m);
            k.appendChild(l);
            h.addEventListener("click", function() {
                game.citySystem.purchaseResearch(a.id)
            }, !1);
            l = document.createElement("div");
            c.appendChild(h);
            for (h = 0; h < g.length; h++) {
                var m = document.createElement("div"),
                    n = document.createElement("div");
                n.id = "researchtooltip" + a.id + "ingredient" + h;
                n.classList.add("crafting-tooltip");
                var q = document.createElement("span");
                q.textContent = "/" + formatNumber(g[h].quantity) + " " + g[h].item.Name;
                m.appendChild(n);
                m.appendChild(q);
                l.appendChild(m);
                c.appendChild(g[h].sizePrefix("Third-").display(""))
            }
            tooltip.complexCreate(c, l);
            b.appendChild(k);
            b.appendChild(c);
            b.appendChild(d);
            return b
        };
        a.prototype.drawConstructionQueue = function() {
            var a = document.createElement("div");
            a.classList.add("construction-queue");
            var b = document.createElement("div");
            b.id = "research-ongoing";
            var d = document.createElement("div");
            d.textContent = "Current Project";
            d.classList.add("storecategoryheader");
            a.appendChild(d);
            b.style.backgroundColor = "#5D5D5D";
            b.style.marginBottom = "5px";
            a.appendChild(b);
            b = document.createElement("div");
            b.classList.add("storecategoryheader");
            b.textContent = "Queue";
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "research-queue";
            b.style.backgroundColor = "#5D5D5D";
            a.appendChild(b);
            return a
        };
        a.prototype.drawQueueItem = function(a) {
            var b = document.createElement("div");
            b.classList.add("construction-queue-item");
            b.id = "researchprojectqueue" + a.id;
            var d = document.createElement("div");
            d.classList.add("cqi-tools");
            var c = document.createElement("div");
            c.classList.add("cqi-tool");
            c.classList.add("close");
            c.addEventListener("click", function() {
                game.citySystem.researchDelete(game.citySystem.researchById(a.id))
            }, !1);
            var g = document.createElement("div");
            g.classList.add("up");
            g.classList.add("cqi-tool");
            g.id = "researchshiftup" + a.id;
            g.addEventListener("click", function(b) {
                b.ctrlKey ?
                    game.citySystem.researchTop(game.citySystem.researchById(a.id)) : game.citySystem.researchUp(game.citySystem.researchById(a.id))
            }, !1);
            var h = document.createElement("div");
            h.classList.add("cqi-tool");
            h.id = "researchshiftdown" + a.id;
            h.classList.add("down");
            h.addEventListener("click", function(b) {
                b.ctrlKey ? game.citySystem.researchBot(game.citySystem.researchById(a.id)) : game.citySystem.researchDown(game.citySystem.researchById(a.id))
            }, !1);
            d.appendChild(c);
            d.appendChild(g);
            d.appendChild(h);
            c = document.createElement("div");
            c.classList.add("cqi-header");
            c.textContent = a.research.upgrade.Name;
            g = document.createElement("div");
            g.style.position = "relative";
            var h = document.createElement("progress"),
                k = document.createElement("div");
            k.classList.add("progressText");
            k.id = "researchprojectprogresstimer" + a.id;
            h.classList.add("greenprog");
            h.style.width = "100%";
            h.id = "researchprojectprogress" + a.id;
            g.appendChild(h);
            g.appendChild(k);
            b.appendChild(d);
            b.appendChild(c);
            b.appendChild(g);
            return b
        };
        a.prototype.removeQueueItem = function(a) {
            a = document.getElementById("projectqueue" +
                a.id);
            a.parentElement.removeChild(a)
        };
        return a
    }(UI),
    ConstructionOfficeUI = function(b) {
        function a(a) {
            b.call(this);
            this.city = a;
            this.employees = [];
            this.workplaceIds = [];
            this.workBoxIds = []
        }
        __extends(a, b);
        a.prototype.draw = function() {
            var a = document.createElement("div");
            a.id = "constructionTab";
            a.classList.add("city-content");
            var b = document.createElement("div");
            b.classList.add("storecategoryheader");
            b.textContent = "Construction Office";
            a.appendChild(b);
            for (var b = this.drawCategory("Employees"), d = 0; d < this.city.buildings.length; ++d) {
                var c =
                    this.city.buildings[d];
                if (0 > this.employees.indexOf(c.employee)) {
                    var g = c.employee;
                    this.employees.push(g);
                    b.appendChild(this.drawEmployee(g))
                }
            }
            g = this.drawCategory("Housing");
            for (d = 0; d < this.city.buildings.length; ++d) c = this.city.buildings[d], 0 < c.population && (c = this.drawConstruction(c), c.id = "buildingbox" + d, g.appendChild(c));
            for (var h = this.drawCategory("Workplaces"), d = 0; d < this.city.buildings.length; ++d) c = this.city.buildings[d], 0 >= c.population && (this.workplaceIds.push(c.id), c = this.drawConstruction(c), c.id =
                "buildingbox" + d, h.appendChild(c), this.workBoxIds.push(d));
            a.appendChild(this.drawConstructionQueue());
            a.appendChild(b);
            a.appendChild(g);
            a.appendChild(h);
            return a
        };
        a.prototype.drawConstructionQueue = function() {
            var a = document.createElement("div");
            a.classList.add("construction-queue");
            var b = document.createElement("div");
            b.id = "construction-ongoing";
            var d = document.createElement("div");
            d.textContent = "Current Project";
            d.classList.add("storecategoryheader");
            a.appendChild(d);
            b.style.backgroundColor = "#5D5D5D";
            b.style.marginBottom = "5px";
            a.appendChild(b);
            b = document.createElement("div");
            b.classList.add("storecategoryheader");
            b.textContent = "Queue";
            a.appendChild(b);
            b = document.createElement("div");
            b.id = "construction-queue";
            b.style.backgroundColor = "#5D5D5D";
            a.appendChild(b);
            return a
        };
        a.prototype.drawCategory = function(a) {
            var b = document.createElement("div"),
                d = document.createElement("div");
            d.classList.add("storecategoryheader");
            d.textContent = a;
            b.appendChild(d);
            b.classList.add("citycategory");
            return b
        };
        a.prototype.drawEmployee =
            function(a) {
                var b = document.createElement("div");
                b.classList.add("storeitemcontainer");
                var d = document.createElement("div");
                d.classList.add("storeitemheader");
                d.textContent = a.name;
                var c = document.createElement("div");
                c.classList.add("storeitemfooter");
                var g = (new ItemQuantityPair(Coins, a.getPrice())).sizePrefix("Third-").display("employeecost" + a.id),
                    h = createButton("Buy");
                h.style.marginBottom = "5px";
                h.addEventListener("click", function() {
                    game.citySystem.hireEmployee(a.id)
                }, !1);
                var k = document.createElement("div");
                k.classList.add("store-info-box");
                var l = document.createElement("div"),
                    m = document.createElement("div");
                m.id = "employeequantity" + a.id;
                var n = document.createElement("div");
                n.id = "employeeefficiency" + a.id;
                l.appendChild(m);
                l.appendChild(n);
                k.appendChild(l);
                c.appendChild(h);
                c.appendChild(g);
                b.appendChild(k);
                b.appendChild(d);
                b.appendChild(c);
                return b
            };
        a.prototype.drawConstruction = function(a) {
            var b = document.createElement("div");
            b.classList.add("storeitemcontainer");
            var d = document.createElement("div");
            d.classList.add("storeitemheader");
            d.textContent = a.name;
            var c = document.createElement("div");
            c.classList.add("storeitemfooter");
            var g = a.recipe.GetInputs(),
                h = createButton("Buy");
            h.style.marginBottom = "5px";
            var k = document.createElement("div");
            k.classList.add("store-info-box");
            var l = document.createElement("div"),
                m = document.createElement("div");
            m.id = "buildingquantity" + a.id;
            var n = document.createElement("div");
            n.id = "buildingpop" + a.id;
            var q = document.createElement("div");
            q.id = "buildingtotpop" + a.id;
            l.appendChild(m);
            l.appendChild(n);
            l.appendChild(q);
            k.appendChild(l);
            h.addEventListener("click", function() {
                game.citySystem.purchaseBuilding(a.id)
            }, !1);
            l = document.createElement("div");
            c.appendChild(h);
            for (h = 0; h < g.length; h++) m = document.createElement("div"), n = document.createElement("div"), n.id = "buildingtooltip" + a.id + "ingredient" + h, n.classList.add("crafting-tooltip"), q = document.createElement("span"), q.textContent = "/" + formatNumber(g[h].quantity) + " " + g[h].item.Name, m.appendChild(n), m.appendChild(q), l.appendChild(m), c.appendChild(g[h].sizePrefix("Third-").display(""));
            tooltip.complexCreate(c, l);
            b.appendChild(k);
            b.appendChild(c);
            b.appendChild(d);
            return b
        };
        a.prototype.drawQueueItem = function(a) {
            var b = document.createElement("div");
            b.classList.add("construction-queue-item");
            b.id = "projectqueue" + a.id;
            var d = document.createElement("div");
            d.classList.add("cqi-tools");
            var c = document.createElement("div");
            c.classList.add("cqi-tool");
            c.classList.add("close");
            c.addEventListener("click", function() {
                game.citySystem.constructionDelete(game.citySystem.constructionById(a.id))
            }, !1);
            var g = document.createElement("div");
            g.classList.add("up");
            g.classList.add("cqi-tool");
            g.id = "shiftup" + a.id;
            g.addEventListener("click", function(b) {
                b.ctrlKey ? game.citySystem.constructionTop(game.citySystem.constructionById(a.id)) : game.citySystem.constructionUp(game.citySystem.constructionById(a.id))
            }, !1);
            var h = document.createElement("div");
            h.classList.add("cqi-tool");
            h.id = "shiftdown" + a.id;
            h.classList.add("down");
            h.addEventListener("click", function(b) {
                b.ctrlKey ? game.citySystem.constructionBot(game.citySystem.constructionById(a.id)) :
                    game.citySystem.constructionDown(game.citySystem.constructionById(a.id))
            }, !1);
            d.appendChild(c);
            d.appendChild(g);
            d.appendChild(h);
            c = document.createElement("div");
            c.classList.add("cqi-header");
            c.textContent = a.building.name;
            g = document.createElement("div");
            g.style.position = "relative";
            var h = document.createElement("progress"),
                k = document.createElement("div");
            k.classList.add("progressText");
            k.id = "projectprogresstimer" + a.id;
            h.classList.add("greenprog");
            h.style.width = "100%";
            h.id = "projectprogress" + a.id;
            g.appendChild(h);
            g.appendChild(k);
            b.appendChild(d);
            b.appendChild(c);
            b.appendChild(g);
            return b
        };
        a.prototype.removeQueueItem = function(a) {
            a = document.getElementById("projectqueue" + a.id);
            a.parentElement.removeChild(a)
        };
        a.prototype.update = function() {
            for (var a = document.getElementById("constructionTab").getElementsByClassName("citycategory"), b = 0; b < a.length; ++b) {
                for (var d = a[b].childNodes, c = !0, g = 0; g < d.length; ++g)
                    if ("none" !== d[g].style.display && 0 !== g) {
                        c = !1;
                        break
                    }
                a[b].style.display = c ? "none" : "block"
            }
            a = document.getElementById("construction-queue");
            b = [];
            g = document.getElementById("construction-ongoing");
            document.getElementById("cityheader").textContent = "Population: " + StatPopulation.Value.toString();
            this.city.ongoingConstruction ? (g.children[0] && (c = g.children[0].getAttribute("id"), c = c.replace("projectqueue", ""), c = parseFloat(c), this.city.ongoingConstruction.id !== c && g.removeChild(g.children[0])), g.children[0] || (d = this.drawQueueItem(this.city.ongoingConstruction), d.classList.add("progressed"), g.appendChild(d)), d = this.city.ongoingConstruction, g = d.building.employee,
                g = g.quantity * g.efficiency, c = document.getElementById("projectprogress" + d.id), document.getElementById("projectprogresstimer" + d.id).textContent = formatTime((d.maxProgress - d.progress) / g), c.setAttribute("value", d.progress.toString()), c.setAttribute("max", d.maxProgress.toString())) : g.children[0] && g.removeChild(g.children[0]);
            for (g = 0; g < this.city.constructionQueue.length; ++g) d = this.city.constructionQueue[g], b.push(d.id), c = document.getElementById("projectqueue" + d.id), c || (a.appendChild(this.drawQueueItem(d)),
                c = document.getElementById("projectqueue" + d.id)), d = Array.prototype.slice.call(a.children).indexOf(c), d !== g && -1 !== d && shiftElement(c, d - g);
            for (g = 0; g < a.children.length; ++g) d = a.children[g], c = d.getAttribute("id"), c = c.replace("projectqueue", ""), c = parseFloat(c), -1 === b.indexOf(c) && d.parentNode.removeChild(d);
            for (g = 0; g < this.city.buildings.length; ++g) {
                a = this.city.buildings[g];
                b = document.getElementById("buildingbox" + g);
                d = a.recipe.GetInputs();
                for (c = 0; c < d.length; c++) {
                    var h = document.getElementById("buildingtooltip" +
                        a.id + "ingredient" + c);
                    h && (h.textContent = formatNumber(d[c].item.Quantity))
                }
                0 < a.population ? (d = document.getElementById("buildingquantity" + g), c = document.getElementById("buildingpop" + g), h = document.getElementById("buildingtotpop" + g), d.textContent = "Built: " + a.quantity, c.textContent = "Capacity: " + a.population, h.textContent = "Population: " + a.population * a.quantity) : 0 < a.quantity && (b.style.display = "none");
                a.requires && (b.style.display = a.requires.Active ? "inline-block" : "none")
            }
            for (g = 0; g < this.city.employees.length; ++g)
                if (a =
                    this.city.employees[g], b = document.getElementById("employeecost" + a.id)) b.textContent = formatNumber(a.getPrice());
            for (g = 0; g < this.city.constructionQueue.length; ++g) b = this.city.constructionQueue[g].id, a = document.getElementById("shiftup" + b), b = document.getElementById("shiftdown" + b), a.style.display = 0 === g ? "none" : "inline-block", b.style.display = g === this.city.constructionQueue.length - 1 ? "none" : "inline-block";
            for (g = 0; g < this.city.employees.length; ++g) a = this.city.employees[g], b = document.getElementById("employeequantity" +
                a.id), d = document.getElementById("employeeefficiency" + a.id), b && (b.textContent = "Quantity: " + a.quantity), d && (d.textContent = "Efficiency: " + 100 * a.efficiency + "%");
            for (g = 0; g < this.workplaceIds.length; ++g) 0 < this.city.buildings[this.workplaceIds[g]].quantity ? document.getElementById("buildingbox" + this.workBoxIds[g]).style.display = "none" : document.getElementById("buildingbox" + this.workBoxIds[g]).style.display = "inline-block"
        };
        return a
    }(UI),
    CityUI = function(b) {
        function a(a, e) {
            b.call(this);
            this.upgrades = e;
            this.city =
                a;
            this.draw()
        }
        __extends(a, b);
        a.prototype.initializeCityTabSystem = function() {};
        a.prototype.draw = function() {
            var a = document.getElementById("tabs-City"),
                b = document.createElement("div");
            b.classList.add("citypane");
            var d = document.createElement("div");
            d.classList.add("city-tab-holder");
            var c = document.createElement("div");
            c.id = "cityheader";
            var g = document.createElement("div");
            g.classList.add("city-tab");
            g.textContent = "Construction Office";
            var h = document.createElement("div");
            h.classList.add("city-tab");
            h.textContent =
                "University";
            var k = document.createElement("div");
            k.classList.add("city-tab");
            k.textContent = "Gas Station";
            d.appendChild(g);
            d.appendChild(h);
            d.appendChild(k);
            this.uis = [];
            var l = new ConstructionOfficeUI(this.city);
            this.uis.push(l);
            var m = new UniversityUI(this.city);
            this.uis.push(m);
            var n = new GasStationUI(this.city, this.upgrades);
            this.uis.push(n);
            for (var q = 0; q < this.uis.length; ++q) {
                var s = this.uis[q].draw();
                b.appendChild(s)
            }
            b.appendChild(d);
            a.appendChild(c);
            a.appendChild(b);
            a = new Tab(document.getElementById("constructionTab"),
                g);
            a.ui = l;
            h = new Tab(document.getElementById("universityTab"), h);
            h.requires = University;
            h.ui = m;
            k = new Tab(document.getElementById("gasStationTab"), k);
            k.requires = Gas_Station;
            k.ui = n;
            this.city.cityTabs.registerItem(a);
            this.city.cityTabs.registerItem(h);
            this.city.cityTabs.registerItem(k)
        };
        a.prototype.update = function() {
            for (var a = 0; a < this.uis.length; ++a) this.uis[a].update()
        };
        return a
    }(UI),
    CitySystem = function() {
        function b() {
            this.maxQueueLength = 25;
            this.researchProjects = this.constructionProjects = this.lowestUnregisteredUIId =
                this.lowestUnregisteredEmployeeId = this.lowestUnregisteredBuildingId = this.lowestUnregisteredResearchId = 0;
            this.Name = "City";
            this.availableWorkers = 0;
            this.Reset()
        }
        b.prototype.RegisterUI = function(a) {
            this.uis[this.lowestUnregisteredUIId] = a;
            this.lowestUnregisteredUIId++
        };
        b.prototype.RegisterBuilding = function(a) {
            a.id = this.lowestUnregisteredBuildingId;
            this.buildings[this.lowestUnregisteredBuildingId] = a;
            this.lowestUnregisteredBuildingId++
        };
        b.prototype.RegisterEmployee = function(a) {
            a.id = this.lowestUnregisteredEmployeeId;
            this.employees[this.lowestUnregisteredEmployeeId] = a;
            this.lowestUnregisteredEmployeeId++
        };
        b.prototype.RegisterResearch = function(a) {
            a.id = this.lowestUnregisteredResearchId;
            this.researches[this.lowestUnregisteredResearchId] = a;
            this.lowestUnregisteredResearchId++
        };
        b.prototype.Reset = function() {
            this.researchProjects = this.constructionProjects = this.lowestUnregisteredUIId = this.lowestUnregisteredEmployeeId = this.lowestUnregisteredBuildingId = this.lowestUnregisteredResearchId = 0;
            if (this.buildings)
                for (var a = 0; a < this.buildings.length; ++a) this.buildings[a].quantity =
                    0;
            this.buildings = [];
            if (this.employees)
                for (a = 0; a < this.employees.length; ++a) {
                    var b = this.employees[a];
                    b.quantity = b.baseQuantity
                }
            this.employees = [];
            this.researches = [];
            this.uis = [];
            this.researchQueue = [];
            this.constructionQueue = [];
            this.cityTabs ? this.cityTabs.reset() : this.cityTabs = new CityTabSystem;
            this.ongoingConstruction = this.ongoingResearch = null
        };
        b.prototype.purchaseBuilding = function(a) {
            if (this.constructionQueue.length > this.maxQueueLength) a = msg.create(), a.type = 1, a.text = "You may have a maximum of " + this.maxQueueLength +
                " construction projects queued at once.", a.timeout = 8, a.send();
            else {
                a = this.buildings[a];
                for (var b = !0, e = 0; e < a.recipe.inputs.length; ++e) {
                    var d = a.recipe.inputs[e].item,
                        c = a.recipe.inputs[e].quantity;
                    d.Quantity < c && (b = !1)
                }
                if (b) {
                    for (e = 0; e < a.recipe.inputs.length; ++e) d = a.recipe.inputs[e].item, c = a.recipe.inputs[e].quantity, d.Quantity -= c;
                    a = new ConstructionProject(a);
                    a.id = this.constructionProjects;
                    this.constructionProjects++;
                    this.constructionQueue.push(a)
                }
            }
        };
        b.prototype.purchaseResearch = function(a) {
            if (this.researchQueue.length >
                this.maxQueueLength) a = msg.create(), a.type = 1, a.text = "You may have a maximum of " + this.maxQueueLength + " research projects queued at once.", a.timeout = 8, a.send();
            else {
                a = this.researches[a];
                for (var b = !0, e = 0; e < a.recipe.inputs.length; ++e) {
                    var d = a.recipe.inputs[e].item,
                        c = a.recipe.inputs[e].quantity;
                    d.Quantity < c && (b = !1)
                }
                if (b) {
                    for (e = 0; e < a.recipe.inputs.length; ++e) d = a.recipe.inputs[e].item, c = a.recipe.inputs[e].quantity, d.Quantity -= c;
                    a = new ResearchProject(a);
                    a.id = this.researchProjects;
                    this.researchProjects++;
                    this.researchQueue.push(a)
                }
            }
        };
        b.prototype.freeResearch = function(a) {
            a = new ResearchProject(this.researches[a]);
            a.id = this.researchProjects;
            this.researchProjects++;
            this.researchQueue.push(a)
        };
        b.prototype.freeBuilding = function(a) {
            a = new ConstructionProject(this.buildings[a]);
            a.id = this.constructionProjects;
            this.constructionProjects++;
            this.constructionQueue.push(a)
        };
        b.prototype.hireEmployee = function(a) {
            a = this.employees[a];
            a.quantity < a.maxQuantity && Coins.Quantity >= a.getPrice() && (Coins.Quantity -= a.getPrice(),
                a.quantity++)
        };
        b.prototype.tick = function() {
            this.construct();
            this.census();
            this.research();
            this.cityTabs.update()
        };
        b.prototype.census = function() {
            for (var a = 0, b = 0; b < this.buildings.length; ++b) var e = this.buildings[b],
                a = a + e.quantity * e.population;
            StatPopulation.Value = a
        };
        b.prototype.construct = function() {
            (!this.ongoingConstruction || null === this.ongoingConstruction) && 0 < this.constructionQueue.length && (this.ongoingConstruction = this.constructionQueue[0], this.constructionQueue.splice(0, 1));
            var a = this.ongoingConstruction;
            a && (a.workers = a.building.employee.quantity, a.tick(), a.progress >= a.maxProgress && (this.ongoingConstruction = null))
        };
        b.prototype.research = function() {
            (!this.ongoingResearch || null === this.ongoingResearch) && 0 < this.researchQueue.length && (this.ongoingResearch = this.researchQueue[0], this.researchQueue.splice(0, 1));
            var a = this.ongoingResearch;
            a && (a.workers = a.research.employee.quantity, a.tick(), a.progress >= a.maxProgress && (this.ongoingResearch = null))
        };
        b.prototype.researchById = function(a) {
            for (var b = 0; b < this.researchQueue.length; ++b)
                if (this.researchQueue[b].id ===
                    a) return this.researchQueue[b]
        };
        b.prototype.researchTop = function(a) {
            var b = this.researchQueue.indexOf(a);
            this.researchQueue.splice(b, 1);
            this.researchQueue.unshift(a)
        };
        b.prototype.researchBot = function(a) {
            var b = this.researchQueue.indexOf(a);
            this.researchQueue.splice(b, 1);
            this.researchQueue.push(a)
        };
        b.prototype.researchUp = function(a) {
            a = this.researchQueue.indexOf(a);
            var b = this.researchQueue[a - 1];
            this.researchQueue[a - 1] = this.researchQueue[a];
            this.researchQueue[a] = b
        };
        b.prototype.researchDown = function(a) {
            a =
                this.researchQueue.indexOf(a);
            var b = this.researchQueue[a + 1];
            this.researchQueue[a + 1] = this.researchQueue[a];
            this.researchQueue[a] = b
        };
        b.prototype.researchDelete = function(a) {
            a = this.researchQueue.indexOf(a);
            this.researchQueue.splice(a, 1)
        };
        b.prototype.constructionById = function(a) {
            for (var b = 0; b < this.constructionQueue.length; ++b)
                if (this.constructionQueue[b].id === a) return this.constructionQueue[b]
        };
        b.prototype.constructionTop = function(a) {
            var b = this.constructionQueue.indexOf(a);
            this.constructionQueue.splice(b,
                1);
            this.constructionQueue.unshift(a)
        };
        b.prototype.constructionBot = function(a) {
            var b = this.constructionQueue.indexOf(a);
            this.constructionQueue.splice(b, 1);
            this.constructionQueue.push(a)
        };
        b.prototype.constructionUp = function(a) {
            a = this.constructionQueue.indexOf(a);
            var b = this.constructionQueue[a - 1];
            this.constructionQueue[a - 1] = this.constructionQueue[a];
            this.constructionQueue[a] = b
        };
        b.prototype.constructionDown = function(a) {
            a = this.constructionQueue.indexOf(a);
            var b = this.constructionQueue[a + 1];
            this.constructionQueue[a +
                1] = this.constructionQueue[a];
            this.constructionQueue[a] = b
        };
        b.prototype.constructionDelete = function(a) {
            a = this.constructionQueue.indexOf(a);
            this.constructionQueue.splice(a, 1)
        };
        return b
    }(),
    Employee = function() {
        function b() {
            this.priceMod = 1.2;
            this.efficiency = 1;
            this.baseQuantity = this.quantity = 0
        }
        b.prototype.getPrice = function() {
            var a = Math.pow(this.priceMod, this.quantity);
            return Math.ceil(a * this.basePrice)
        };
        b.prototype.setPrice = function(a) {
            this.basePrice = a;
            return this
        };
        b.prototype.setName = function(a) {
            this.name =
                a;
            return this
        };
        b.prototype.setBaseQuantity = function(a) {
            this.baseQuantity = a;
            this.quantity < a && (this.quantity = a);
            return this
        };
        b.prototype.setMaxQuantity = function(a) {
            this.maxQuantity = a;
            return this
        };
        return b
    }(),
    Building = function() {
        function b() {
            this.progress = this.population = this.quantity = 0
        }
        Object.defineProperty(b.prototype, "Active", {
            get: function() {
                return 0 < this.quantity
            },
            enumerable: !0,
            configurable: !0
        });
        b.prototype.setName = function(a) {
            this.name = a;
            return this
        };
        b.prototype.setMaxProgress = function(a) {
            this.maxProgress =
                a;
            return this
        };
        b.prototype.setEmployee = function(a) {
            this.employee = a;
            return this
        };
        b.prototype.setRecipe = function(a) {
            this.recipe = a;
            return this
        };
        b.prototype.construct = function() {};
        return b
    }(),
    PopulationBuilding = function(b) {
        function a() {
            b.call(this);
            this.progress = this.quantity = this.population = 0;
            this.Active = !1
        }
        __extends(a, b);
        a.prototype.setName = function(a) {
            this.name = a;
            return this
        };
        a.prototype.setMaxProgress = function(a) {
            this.maxProgress = a;
            return this
        };
        a.prototype.setMaxQuantity = function(a) {
            this.maxQuantity =
                a;
            return this
        };
        a.prototype.setPopulation = function(a) {
            this.population = a;
            return this
        };
        a.prototype.setEmployee = function(a) {
            this.employee = a;
            return this
        };
        a.prototype.setRecipe = function(a) {
            this.recipe = a;
            return this
        };
        a.prototype.setRequires = function(a) {
            this.requires = a;
            return this
        };
        a.prototype.construct = function() {
            this.Active = !0;
            this.quantity++
        };
        return a
    }(Building),
    UnlockBuilding = function(b) {
        function a() {
            b.call(this);
            this.population = this.quantity = 0;
            this.Active = !1;
            this.maxQuantity = 1;
            this.progress = 0
        }
        __extends(a,
            b);
        a.prototype.setName = function(a) {
            this.name = a;
            return this
        };
        a.prototype.setMaxProgress = function(a) {
            this.maxProgress = a;
            return this
        };
        a.prototype.setMaxQuantity = function(a) {
            this.maxQuantity = a;
            return this
        };
        a.prototype.setEmployee = function(a) {
            this.employee = a;
            return this
        };
        a.prototype.setRecipe = function(a) {
            this.recipe = a;
            return this
        };
        a.prototype.setRequires = function(a) {
            this.requires = a;
            return this
        };
        a.prototype.construct = function() {
            this.Active = !0;
            this.quantity++
        };
        return a
    }(Building),
    ConstructionProject = function() {
        function b(a) {
            this.workers =
                this.progress = 0;
            this.building = a;
            this.maxProgress = a.maxProgress
        }
        b.prototype.tick = function() {
            this.progress += game.frameTime * this.workers * this.building.employee.efficiency;
            this.progress >= this.maxProgress && this.building.construct()
        };
        return b
    }(),
    Research = function() {
        function b() {
            this.employee = Scholar
        }
        Object.defineProperty(b.prototype, "Active", {
            get: function() {
                return this.upgrade.Active
            },
            set: function(a) {
                a && this.upgrade.Activate()
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "name", {
            get: function() {
                return this.upgrade.Name
            },
            enumerable: !0,
            configurable: !0
        });
        b.prototype.setDuration = function(a) {
            this.duration = a;
            return this
        };
        b.prototype.setUpgrade = function(a) {
            this.upgrade = a;
            return this
        };
        b.prototype.setRecipe = function(a) {
            this.recipe = a;
            return this
        };
        b.prototype.setEmployee = function(a) {
            this.employee = a;
            return this
        };
        b.prototype.learn = function() {
            this.Active = !0
        };
        return b
    }(),
    ResearchProject = function() {
        function b(a) {
            this.workers = this.progress = 0;
            this.research = a;
            this.maxProgress = this.research.duration
        }
        b.prototype.tick = function() {
            this.progress +=
                game.frameTime * this.workers * this.research.employee.efficiency;
            this.progress >= this.maxProgress && this.research.learn()
        };
        return b
    }(),
    Builder = new Employee,
    Scholar = new Employee,
    BionicEyesResearch = new Research,
    EnvironmentalResearch = new Research,
    XrayDrillsResearch = new Research,
    PrecisionCrushersResearch = new Research,
    SelfLubeResearch = new Research,
    HouseT1 = new PopulationBuilding,
    HouseT2 = new PopulationBuilding,
    HouseT3 = new PopulationBuilding,
    HouseT4 = new PopulationBuilding,
    HouseT5 = new PopulationBuilding,
    University =
    new UnlockBuilding,
    Gas_Station = new UnlockBuilding,
    MiningCamp = new UnlockBuilding,
    LoggingCamp = new UnlockBuilding,
    initialClicks = 0,
    blockingAds = !1,
    didBlock, game, data, currentVersion, loadVersion, lastSave = 0,
    saveInterval = 15,
    lastLaunchedVersion, newVersionNotified = !1,
    pastFrames = [],
    averageFPS = 0,
    Game = function() {
        function b() {
            this.last = Date.now();
            this.itemSystem = new ItemSystem;
            this.gathererSystem = new GathererSystem;
            this.upgradeSystem = new UpgradeSystem;
            this.processorSystem = new ProcessorSystem;
            this.buffSystem = new BuffSystem;
            this.statisticSystem = new StatisticSystem;
            this.achievementSystem = new AchievementSystem;
            this.prestigeSystem = new PrestigeSystem;
            this.tabSystem = new TabSystem;
            this.citySystem = new CitySystem;
            this.storeSystem = new StoreSystem;
            data = new Data(this.itemSystem, this.gathererSystem, this.upgradeSystem, this.processorSystem, this.buffSystem, this.statisticSystem, this.achievementSystem, this.prestigeSystem, this.tabSystem, this.citySystem, this.storeSystem);
            this.inventory = new Inventory(this.itemSystem);
            this.inventoryUI = new InventoryUI(this.inventory,
                this.buffSystem, this.gathererSystem);
            InventoryTab.ui = this.inventoryUI;
            this.craftingUI = new CraftingUI(this.processorSystem, this.upgradeSystem, this.itemSystem);
            CraftingTab.ui = this.craftingUI;
            this.storeUI = new StoreUI(this.upgradeSystem, this.gathererSystem, this.itemSystem);
            StoreTab.ui = this.storeUI;
            this.equipmentUI = new EquipmentUI(this.upgradeSystem, this.gathererSystem);
            EquipmentTab.ui = this.equipmentUI;
            this.statisticUI = new StatisticsUI(this.itemSystem);
            StatisticsTab.ui = this.statisticUI;
            this.headerUI = new HeaderUI(data);
            this.achievementUI = new AchievementUI(this.achievementSystem);
            AchievementsTab.ui = this.achievementUI;
            this.prestigeUI = new PrestigeUI(this.prestigeSystem);
            PrestigeTab.ui = this.prestigeUI;
            this.cityUI = new CityUI(this.citySystem, this.upgradeSystem);
            CityTab.ui = this.cityUI;
            this.upgradeSystem.ActivateOnLoad();
            initialClicks = StatRockClicked.Value
        }
        b.prototype.reset = function() {
            data.InitializeItemSystem(data.itemSystem)
        };
        b.prototype.tick = function() {
            game.now = Date.now();
            if (blockingAds && !didBlock) {
                didBlock = !0;
                var a =
                    document.createElement("div");
                a.style.textAlign = "center";
                a.style.backgroundColor = "black";
                var b = document.createElement("span");
                b.textContent = "Hosting Gold Rush is not free, please consider disabling Ad Blocker on this page to help cover hosting costs.";
                b.style.color = "white";
                a.appendChild(b);
                document.getElementById("bottom-spotlight").appendChild(a)
            }
            AdblockDebuff.RemainingTime = 0;
            game.frameTime = (game.now - game.last) / 1E3;
            game.gathererSystem.Mine();
            game.processorSystem.Process();
            game.buffSystem.tick();
            game.citySystem.tick();
            game.storeSystem.tick();
            game.achievementSystem.Check();
            game.upgradeSystem.UpgradeFromBuilding();
            game.headerUI.update();
            game.inventoryUI.update();
            game.tabSystem.update();
            notifyNewerVersion();
            lastSave += game.frameTime;
            StatTimePlayed.Value += game.frameTime;
            pastFrames.unshift(game.frameTime);
            100 < pastFrames.length && pastFrames.pop();
            for (b = a = 0; b < pastFrames.length; b++) a += pastFrames[b];
            averageFPS = 1E3 / (a / pastFrames.length * 1E3);
            document.getElementsByClassName("fps-counter")[0].textContent =
                Math.floor(averageFPS) + "fps";
            lastSave > saveInterval && (data.save(), getNewestVersion(), lastSave = 0);
            game.last = game.now
        };
        return b
    }();
window.onload = function() {
    msg.start();
    game = new Game;
    game.prestigeSystem.ActivateRewards();
    getNewestVersion();
    document.getElementById("adtester") || (blockingAds = !0);
    game.tick();
    hidePreloader();
    setInterval(game.tick, 10)
};

function backwardsCompatibility() {
    console.log("Maintaining compatibility. " + lastLaunchedVersion);
    lastLaunchedVersion < versionNumberToValue("v0.7.4") && (console.log("lumberjack backwards compat"), ChainsawT1.Active && (ChainsawT3.Activate(), ChainsawT1.Deactivate()), ChainsawT2.Active && (ChainsawT4.Activate(), ChainsawT2.Deactivate()))
}

function clickTracking(b, a) {
    0 != (a - b) % 1E3 && 1 != a - b && 100 != a - b || ga("send", {
        hitType: "event",
        eventCategory: "Click Milestone",
        eventAction: "Click",
        eventLabel: a - b
    })
}

function getNewestVersion() {
    var b;
    b = new XMLHttpRequest;
    setTimeout(function() {
        b.abort()
    }, 2500);
    b.onreadystatechange = function() {
        if (4 === b.readyState && 200 === b.status && (currentVersion = b.responseText, !loadVersion)) {
            0 === StatVersionNumber.Value && (StatVersionNumber.Value = versionNumberToValue(currentVersion));
            lastLaunchedVersion = StatVersionNumber.Value;
            if (lastLaunchedVersion != versionNumberToValue(b.responseText)) {
                var a = new XMLHttpRequest;
                setTimeout(function() {
                    a.abort()
                }, 2500);
                a.onreadystatechange = function() {
                    if (4 ===
                        a.readyState && 200 === a.status) {
                        var b = new modal.Window;
                        b.title = "Updates";
                        var e = document.createElement("div");
                        e.textContent = "We've made some changes since you last played.";
                        b.addElement(e);
                        b.addElement(parseUpdates(a.responseText));
                        b.addOption("OK").addEventListener("click", function() {
                            modal.close()
                        }, !1);
                        b.show();
                        backwardsCompatibility();
                        ga("send", {
                            hitType: "event",
                            eventCategory: "Returning Visitor",
                            eventAction: "Update",
                            eventLabel: lastLaunchedVersion + " -> " + currentVersion
                        })
                    }
                };
                a.open("GET", "/version-history/?time=" +
                    Date.now(), !0);
                a.send()
            }
            loadVersion = currentVersion = b.responseText;
            StatVersionNumber.Value = versionNumberToValue(loadVersion)
        }
    };
    b.open("GET", "/version-history/version.txt?time=" + Date.now(), !0);
    b.send()
}

function parseUpdates(b) {
    var a = document.createElement("div");
    a.innerHTML = b;
    var f = a.getElementsByClassName("update");
    b = document.createElement("div");
    b.style.maxHeight = "250px";
    b.style.overflow = "auto";
    b.style.padding = "3px";
    for (var a = [], e = 0; e < f.length; e++) a.push(f[e]);
    for (f = 0; f < a.length; ++f) e = a[f].getElementsByTagName("b")[0].textContent.split(" - ")[1], versionNumberToValue(e) > lastLaunchedVersion && b.appendChild(a[f]);
    return b
}

function notifyNewerVersion() {
    if (loadVersion != currentVersion && !newVersionNotified) {
        newVersionNotified = !0;
        var b = msg.create();
        b.type = 2;
        b.text = "A newer version of Gold Rush is available!";
        b.decay = !1;
        b.send()
    }
}

function getDataset(b, a) {
    return b.dataset ? b.dataset[a] : b.getAttribute("data-" + a)
}

function setDataset(b, a, f) {
    b.dataset ? b.dataset[a] = f : b.setAttribute("data-" + a, f)
}

function formatNumber(b) {
    if (999999999999999 < b) return (b / 1E15).toFixed(3) + "Qa";
    if (999999999999 < b) return (b / 1E12).toFixed(3) + "T";
    if (999999999 < b) return (b / 1E9).toFixed(3) + "B";
    if (999999 < b) return (b / 1E6).toFixed(3) + "M";
    b = +b.toFixed(2);
    return b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function versionNumberToValue(b) {
    b = b.replace("v", "");
    b = b.split(".");
    for (var a = 0, f = 0; f < b.length; ++f) a += +b[f] * Math.pow(10, 10 - 2 * f) / 10;
    return a
}

function formatTime(b) {
    var a = Math.floor(b / 3600),
        f = Math.floor(b % 3600 / 60);
    b = Math.floor(b % 60);
    return (10 > a ? 1 > a ? "" : "0" + a + ":" : a + ":") + (10 > f ? "0" + f + ":" : f + ":") + (10 > b ? "0" + b : b + "")
}

function randomInt(b, a) {
    return Math.floor(Math.random() * (a - b + 1) + b)
}

function hidePreloader() {
    document.getElementById("preloader").style.display = "none"
}

function clamp(b, a, f) {
    return Math.max(a, Math.min(f, b))
};