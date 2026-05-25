// Tarjetas didácticas — Potenciación, Radicación y Logaritmación
window.FLASHCARDS = [
  // ───────── COMPONENTES ─────────
  { cat: "componentes", q: "¿Qué componente de la potenciación indica la cantidad de veces que se toma la base como factor?", a: "El **exponente**." },
  { cat: "componentes", q: "En la expresión $a^n = b$, ¿cómo se denomina al número $a$?", a: "**Base**." },
  { cat: "componentes", q: "En la potenciación, ¿qué término representa el resultado de multiplicar la base por sí misma según lo indique el exponente?", a: "**La potencia**." },

  // ───────── PROPIEDADES ─────────
  { cat: "propiedades", q: "¿Cuál es la regla para la multiplicación de potencias de igual base?", a: "Se **mantiene la misma base** y se **suman los exponentes**." },
  { cat: "propiedades", q: "Fórmula: $a^m \\cdot a^n = $ _____", a: "$$a^{m+n}$$" },
  { cat: "propiedades", q: "¿Cómo se resuelve el cociente o división de potencias de igual base?", a: "Se **mantiene la misma base** y se **restan los exponentes**." },
  { cat: "propiedades", q: "Fórmula: $a^m \\div a^n = $ _____", a: "$$a^{m-n}$$" },
  { cat: "propiedades", q: "¿Qué acción se realiza con los exponentes en la propiedad de \"potencia de una potencia\"?", a: "Se **mantiene la base** y se **multiplican los exponentes**." },
  { cat: "propiedades", q: "Fórmula: $(a^m)^n = $ _____", a: "$$a^{m \\cdot n}$$" },
  { cat: "propiedades", q: "¿Qué establece la propiedad de la \"potencia de un producto\"?", a: "El exponente se **distribuye a cada uno** de los factores multiplicativos." },
  { cat: "propiedades", q: "Fórmula: $(a \\cdot b)^n = $ _____", a: "$$a^n \\cdot b^n$$" },
  { cat: "propiedades", q: "¿Cómo se aplica la propiedad de \"potencia de un cociente\"?", a: "El exponente se **distribuye** tanto al dividendo como al divisor." },
  { cat: "propiedades", q: "Fórmula: $(a \\div b)^n = $ _____", a: "$$a^n \\div b^n$$" },
  { cat: "propiedades", q: "¿A qué es igual cualquier número natural (distinto de cero) elevado a la potencia cero?", a: "$$1$$" },
  { cat: "propiedades", q: "Fórmula: $a^0 = $ _____  (siendo $a \\ne 0$)", a: "$$1$$" },
  { cat: "propiedades", q: "¿Cuál es el resultado de elevar un número natural a la potencia uno?", a: "**El mismo número** inicial." },
  { cat: "propiedades", q: "Fórmula: $a^1 = $ _____", a: "$$a$$" },
  { cat: "propiedades", q: "¿Es verdadera o falsa la igualdad $(4 + 3)^2 = 4^2 + 3^2$?", a: "**Falsa.**" },
  { cat: "propiedades", q: "¿Por qué no se puede distribuir el exponente en la expresión $(4 + 3)^2$?", a: "Porque el exponente **solo se distribuye en multiplicaciones y divisiones**, nunca en sumas o restas." },

  // ───────── RADICACIÓN ─────────
  { cat: "radicacion", q: "Concepto: **Radicación**", a: "Operación **inversa a la potenciación** que busca hallar la **base** conociendo la potencia y el exponente." },
  { cat: "radicacion", q: "En la expresión $\\sqrt[n]{a} = b$, ¿qué nombre recibe el símbolo $\\sqrt{\\ }$ ?", a: "**Signo radical.**" },
  { cat: "radicacion", q: "En la radicación, ¿cómo se denomina al número ubicado sobre el brazo del radical que indica el grado de la raíz?", a: "**Índice.**" },
  { cat: "radicacion", q: "En la radicación, ¿cómo se denomina al número que se encuentra dentro del signo radical?", a: "**Radicando** o cantidad subradical." },
  { cat: "radicacion", q: "¿Qué término de la radicación representa el valor que, elevado al índice, iguala al radicando?", a: "**Raíz.**" },
  { cat: "radicacion", q: "Por convención universal, ¿qué número se omite cuando el índice de la raíz es 2?", a: "El número **2** (raíz cuadrada)." },
  { cat: "radicacion", q: "¿Qué propiedad permite afirmar que $\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$?", a: "**Propiedad distributiva** respecto a la multiplicación." },
  { cat: "radicacion", q: "Fórmula de la raíz de un cociente: $\\sqrt[n]{a / b} = $ _____", a: "$$\\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$$" },
  { cat: "radicacion", q: "¿Cómo se calcula la \"raíz de una raíz\" $\\left(\\sqrt[n]{\\sqrt[m]{a}}\\right)$ ?", a: "Se **multiplican los índices** y se mantiene el mismo radicando." },
  { cat: "radicacion", q: "Fórmula: $\\sqrt[n]{\\sqrt[m]{a}} = $ _____", a: "$$\\sqrt[n \\cdot m]{a}$$" },
  { cat: "radicacion", q: "¿Qué ocurre cuando el exponente del radicando es igual al índice de la raíz $\\left(\\sqrt[n]{a^n}\\right)$ ?", a: "Las operaciones **se anulan** y el resultado es la base del radicando: $$a$$" },
  { cat: "radicacion", q: "¿Es la radicación distributiva respecto a la suma?", a: "**No.** La radicación no es distributiva respecto a la suma." },
  { cat: "radicacion", q: "¿A qué equivale la raíz de cualquier orden del número 0?", a: "$$0$$" },
  { cat: "radicacion", q: "¿A qué equivale la raíz de cualquier orden del número 1?", a: "$$1$$" },
  { cat: "radicacion", q: "En el conjunto de los números naturales, ¿qué condición debe cumplir el radicando para asegurar una solución real?", a: "Debe ser **positivo o nulo**." },
  { cat: "radicacion", q: "Conversión: expresa $\\sqrt[n]{a}$ como una potencia de exponente fraccionario.", a: "$$a^{1/n}$$" },
  { cat: "radicacion", q: "¿Cómo se llama al proceso de dividir el índice y los exponentes del radicando por su Máximo Común Divisor (MCD)?", a: "**Simplificación de radicales.**" },

  // ───────── LOGARITMACIÓN ─────────
  { cat: "logaritmacion", q: "Concepto: **Logaritmación**", a: "Operación que consiste en hallar el **exponente** al cual se debe elevar una base para obtener un número determinado." },
  { cat: "logaritmacion", q: "En la expresión $\\log_{a} c = b$, ¿qué representa el número $b$?", a: "El **logaritmo** (o exponente)." },
  { cat: "logaritmacion", q: "¿Cuál es la relación fundamental entre potenciación y logaritmación?", a: "$$a^b = c \\iff \\log_{a} c = b$$" },

  // ───────── OPERACIONES INVERSAS ─────────
  { cat: "inversas", q: "En el contexto de operaciones inversas, ¿qué dato se busca en la **potenciación**?", a: "**La potencia.**" },
  { cat: "inversas", q: "En el contexto de operaciones inversas, ¿qué dato se busca en la **radicación**?", a: "**La base.**" },
  { cat: "inversas", q: "En el contexto de operaciones inversas, ¿qué dato se busca en la **logaritmación**?", a: "**El exponente.**" },

  // ───────── APLICACIONES Y JERARQUÍA ─────────
  { cat: "aplicaciones", q: "En la jerarquía de operaciones, ¿en qué nivel se resuelven las potencias y raíces?", a: "En el **segundo nivel** — después de los signos de agrupación y antes de multiplicaciones / divisiones." },
  { cat: "aplicaciones", q: "Si una expresión tiene potencias y raíces seguidas, ¿en qué orden deben resolverse?", a: "De **izquierda a derecha**." },
  { cat: "aplicaciones", q: "En la jerarquía de operaciones, ¿qué función cumplen los paréntesis?", a: "Obligan a resolver primero las operaciones contenidas en ellos, actuando como el nivel de **mayor prioridad**." },
  { cat: "aplicaciones", q: "¿Qué método se recomienda para extraer raíces exactas de números elevados sin calculadora?", a: "**Descomposición en factores primos.**" },
  { cat: "aplicaciones", q: "En geometría, ¿cómo se halla la longitud del lado de un cuadrado si se conoce su área?", a: "Extrayendo la raíz cuadrada del área: $$L = \\sqrt{A}$$" },
  { cat: "aplicaciones", q: "En geometría, ¿cómo se halla la arista de un cubo si se conoce su volumen?", a: "Extrayendo la raíz cúbica del volumen: $$a = \\sqrt[3]{V}$$" },

  // ───────── EJERCICIOS ─────────
  { cat: "ejercicios", q: "Simplifica aplicando las propiedades de la potenciación: $5^3 \\cdot 5^4$", a: "$$5^{7}$$" },
  { cat: "ejercicios", q: "Simplifica aplicando las propiedades de la potenciación: $8^9 \\div 8^6$", a: "$$8^{3}$$" },
  { cat: "ejercicios", q: "Simplifica aplicando las propiedades de la potenciación: $(2^4)^3$", a: "$$2^{12}$$" },
  { cat: "ejercicios", q: "Expande aplicando la propiedad correspondiente: $(3 \\cdot 7)^2$", a: "$$3^2 \\cdot 7^2$$" },
  { cat: "ejercicios", q: "¿Cuál es el valor de $\\sqrt{400}$?", a: "$$20$$" },
  { cat: "ejercicios", q: "Halla el valor de $x$ en la igualdad: $2^3 \\cdot 2^x = 2^7$", a: "$$x = 4$$" },
  { cat: "ejercicios", q: "Halla el valor de $x$ en la igualdad: $10^8 \\div 10^x = 10^5$", a: "$$x = 3$$" },
  { cat: "ejercicios", q: "Halla el valor de $x$ en la igualdad: $(5^x)^2 = 5^{10}$", a: "$$x = 5$$" },
  { cat: "ejercicios", q: "Simplifica la expresión: $(3^2 \\cdot 3^0)^2$", a: "$$3^4 = 81$$" },
  { cat: "ejercicios", q: "¿Cuál es el valor de $\\log_{2} 16$?", a: "$$4$$" },
  { cat: "ejercicios", q: "¿Cuál es el valor de $\\log_{5} 125$?", a: "$$3$$" },

  // ───────── HISTORIA ─────────
  { cat: "historia", q: "¿Cuál es el origen histórico del término \"raíz\" en matemáticas?", a: "Proviene de una **metáfora orgánica** donde la base es la \"raíz\" que da origen al \"árbol\" (la potencia)." },
  { cat: "historia", q: "¿Quién introdujo por primera vez el signo radical moderno ( $\\sqrt{\\ }$ ) en 1525?", a: "**Christoph Rudolff.**" },
  { cat: "historia", q: "¿Qué matemático añadió el vínculo superior (línea horizontal) al signo radical en 1637?", a: "**René Descartes.**" }
];

window.CATEGORIES = [
  { id: "todas",          label: "Todas",                    n: null },
  { id: "componentes",    label: "Componentes",              n: null },
  { id: "propiedades",    label: "Propiedades",              n: null },
  { id: "radicacion",     label: "Radicación",               n: null },
  { id: "logaritmacion",  label: "Logaritmación",            n: null },
  { id: "inversas",       label: "Operaciones inversas",     n: null },
  { id: "aplicaciones",   label: "Jerarquía & aplicaciones", n: null },
  { id: "ejercicios",     label: "Ejercicios",               n: null },
  { id: "historia",       label: "Historia",                 n: null }
];
