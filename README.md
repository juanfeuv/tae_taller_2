# Reporte Técnico

## Integrantes
* Julian David Ruiz Herrera
* Juan Felipe Usuga Villegas
* Jonatan Urrego Zea
* Johan Sebastian Cano Garcia
* Raul vladimir Gaitan Vaca

## Consideraciones
* Video youtube: https://youtu.be/CgvnH3ToEhM
* Link APP: https://main--heartfelt-cupcake-3270df.netlify.app/

## 1. Introducción

El objetivo de este proyecto es construiren Python un modelo de riesgos de crédito que permita aproximar la probabilidad de que una persona incumpla con sus obligaciones crediticias usando un conjunto de datos previamente seleccionado y técnicas de machine learning. Se parte desde el procesamiento de los datos y finalmentese obtiene una scorecard a partir de la cual se puede asignar un puntaje crediticio a una persona y mediante este puntaje se obtiene información sobre el riesgo de otorgarle un crédito a dicha persona.

Se dará un enfoque general y no se tratarán en detalle todos los métodos utilizados para llegar al resultado final.Todos los procedimientos realizados están disponibles en el[ Notebook de Google Colab (click aquí)](https://colab.research.google.com/drive/1_vh6RFmJHkqbde7f74AYSWDVW56C9IeQ?usp=sharing#scrollTo=siLCZOZML86i) y cualquier persona puede realizar una consulta real o ficticiaa través de la[ app web ](https://main--heartfelt-cupcake-3270df.netlify.app/)desarrollada conjuntamente a este modelo.

## 2. Sobre el conjunto de datos

Utilizamos un [conjunto de datos ](https://drive.google.com/file/d/166vL6y2JgEF1L7ys7JoeAEIxSBcUj26H/view?usp=sharing)disponible en Kaggle que contiene información sobre más de 450,000 créditos otorgados por Lending Club entre 2007 y 2014, este incluye información sobre el estado actual del crédito y sobre el deudor y su comportamiento. En el [diccionario de datos ](https://github.com/finlytics-hub/credit_risk_model/blob/master/Data%20Dictionary.xlsx)se puede encontrar más información sobre cada una de las variables del conjunto de datos.

### 2.1. Exploración inicial de los datos

Como primer vistazo de los datos se puede ver que hay variables con más de 80% de valores faltantes y por tanto cualquier método de imputación probablemente resulte en resultados desacertados. Además existen variables que no están relacionadas al riesgo crediticio o que no aportan nada al modelo y por tanto se eliminan.

### 2.2. Variable objetivo

Se selecciona la variable loan\_status como variable objetivo dado que describe claramente si se ha cumplido adecuadamente con las obligaciones crediticias o no; podemos convencernos de esto viendo los estados posibles y sus proporciones tal como se indica en la tabla[ 1.]

![image](https://user-images.githubusercontent.com/45887686/204109006-a1c2e8d7-82c6-4ec2-8b38-50e723dc215e.png)

En ese sentido se van a clasificarlos siguientes estados como estados por defecto y se les asigna el número 0:

- Charged Off
- Default
- Late (31–120 days)
- Does not meet the credit policy. Status:Charged Off

Todos los demás valores se los clasificacomo buenos y se les asigna el número 1

### 2.3. Datos de entrenamiento y de test

Ahora se divide el conjunto de datos separando un 80% de los datos elegidos aleatoriamente los cuales constituyen el conjunto de entrenamiento y el 20restante constitye el conjunto de test. Además como un test preliminar se utilizará el método de validación cruzada sobre el conjunto de entrenamiento y posteriormente se va a validar el conjunto de test.

Es de notar que los datos están fuertemente sesgados hacia los buenos préstamos y por tanto se va a estratificar la división del conjunto de datos, de manera que el conjunto de test mantenga la distribución del conjunto inicial.

### 2.4. Limpieza de datos

Con el objetivo de hacer más mánejables los datos para nuestros propósitos se realizan una serie de transformaciones. Para esto definiremosuna función específicapara cada una para usarlas tanto sobre el conjunto de entrenamiento como en el de test, a saber:
- Se remueve el texto de la columna emp\_length y se convierte en numérica
- Las variables con fechas se convierten al formato datetime
- Se remueve el texto de la columna term y se convierte en numérica.

## 3. Selección de variables

El siguiente paso es seleccionar las variables que itlizaremos apra nuestro modelo. Para esto se utiliza un testχ 2 para las variables categóricas y el estadístico F de ANOVA para las variables numéricas. El primer paso es separar el conjunto de entrenamiento en variables categóricas y variables numéricas.

Una vez separado el conjunto de entrenamiento realizamos el testχ 2 y se obtiene que los p-valores de nuestras variables categóricas son los que se ven en la tabla[ 2.](#_page3_x287.91_y179.89)

De estas se toman las primeras cuatro variables. Para las variables numéricas antes de utilizar el estafístico F de ANOVA se imputan los valores faltantes con 0 directamente y se procede a seleccionar las 16 variables con mayor puntaje.

![image](https://user-images.githubusercontent.com/45887686/204109180-2a32a278-1531-4a58-89f6-6686a578602f.png)

Y obtenemos

![image](https://user-images.githubusercontent.com/45887686/204109201-b4b450e5-0f99-4607-b7af-7d94cb81112d.png)

Se realiza una verificaciónde colinealidad para identificarposibles varibles correlacionadas. Tal como vemos en la figura [1 ](#_page4_x214.84_y438.97)las variables out\_prncp\_inv y total\_pymnt\_inv están altamente correlacionadas y por tanto se eliminan.

En la tabla[ 4 ](#_page5_x279.86_y287.62)se pueden ver las variables seleccionadas para desarrollar el modelo.

### 3.1. One-hot-encoding y conjunto de test

Un paso adicional que es necesario para el modelo es darle a las variables categóricas un valor numérico; esto se hará mediante one-hot-encoding. Este procedimiendo consiste en asignar a cada variable categórica una serie de variables ficticiasque corresponden a cada una de sus categorías y asignar el valor 1 a la variable ficticiacorrespondiente a la categoría a la que pertenece la obervación y 0 a las demás. La convención que utilizamos para asignar el nombre a cada variable ficticiaes: nombre\_de\_la\_variable:categoria. Este procedimiento junto con todos los anteriores

![image](https://user-images.githubusercontent.com/45887686/204110033-8297585b-b2d8-4c1c-93c2-7848ad7852ec.png)

Figura 1: Correlación entre variables numéricas preseleccionadas

se hacen tanto para el conjunto de entrenamiento como para el conjunto de test. Los detalles del código necesario para hacer esto están disponibles en el[ notebook de Google Colab](https://colab.research.google.com/drive/1cp6mqTkppM9KIdezsJ0OywjuLrwvBhOQ#scrollTo=z0yzrjBlNTfQ)

## 4. Peso de evidencia (WoE) y valor de la informacion (IV)

En esta sección se discutirán dos valores que permiten conocer el poder predictivo de una variable, estos son el Peso de evidencia (WoE por sus siglas en inglés) y el valor de la información (IV por sus siglas en inglés); a partir de ahora nos referiremos a ellos como WoE e IV respectivamente. En esta documentación no se va a visualizar y discutir en detalle los valores de WoE e IV de cada variable; el lector puede ver el desarrollo y la visualización de estos en el[ notebook de Google Colab.](https://colab.research.google.com/drive/1cp6mqTkppM9KIdezsJ0OywjuLrwvBhOQ#scrollTo=UN7OGhJeNdQw)

### 4.1. WoE

Para calcular el WoE se debe categorizar las variables numéricas de el modelo. Esto es posible separando las variables por bins y asignando una categoría específicapara los valores faltantes; una vez hecho esto se puede conocer el WoE de cada categoría para una variable específicacon la ecuación[ 1.](#_page4_x235.71_y707.14) El WoE nos da información sobre el poder predictivo de cada una de las categorías asociadas a una variable.

![image](https://user-images.githubusercontent.com/45887686/204110083-653df467-1598-4574-951e-85935c2d7d70.png)

![image](https://user-images.githubusercontent.com/45887686/204110085-953395fd-ea55-45fa-9753-9b7b08b4e8af.png)

### 4.2. IV

El IV permite conocer el poder predictivo de la variable a partir del WoE; a diferencia de este último, con el IV podemos concoer el poder predictivo acumulado de todas las categorías de una variable y no solamente el de cada una de ellas. Se calcula mediante la ecuación[ 2]

![image](https://user-images.githubusercontent.com/45887686/204110103-45c77882-ae16-4e7b-b22f-15793966f320.png)

En la tabla[ 5 ](#_page5_x286.64_y526.84)se puede ver una regla común para clasificarel poder de predicción de una variable a partir del IV.

![image](https://user-images.githubusercontent.com/45887686/204110140-bcfd6047-8750-4bf4-b57b-36b0a755af71.png)

### 4.3. Variables finales

Una vez calculados y visualizados los IV de cada variable unimos algunas de las categorías que obtuvimos para calcular el WoE inicialmente siguiendo estas reglas:

- No se combina ni se deja una categoría particular para valores faltantes.
- Categorías con muy pocas observaciones se combinan con la siguiente.
- Se combinan categorías con WoE muy similar.
- Se ignoran variables con un IV bajo o muy alto.

El resultado finaldespués de hacer las transformaciones correpondientes se puede ver en la tablas [6 y](#_page6_x279.45_y483.98) [7 el](#_page7_x276.95_y483.98) resultado. Este se separa en dos tablas por el bien de la legibilidad del reporte.

![image](https://user-images.githubusercontent.com/45887686/204110178-954512d8-6254-4102-9954-824e76c80ce0.png)

## 5. Construcción del modelo

En esta sección se ajusta un modelo de regresión logística sobre nuestro conjunto de entrenamiento y se usa validación cruzada sobre el mismo como test preliminar.

### 5.1. Entrenamiento del modelo

En el modelo de regresión logística se define el parámetro class\_weight como balanced con el fin de que el modelo tenga un aprendizaje sensible a los costos, es decir que penalice más los falsos negativos que los falsos positivos.

Se usará además el área bajo una curva ROC como métrica de evaluación. Se usará el método RepeatedStratifiedKFold para la validación de los datos.

![image](https://user-images.githubusercontent.com/45887686/204110208-ce75a861-85c1-4eb8-94cd-47d0695fb149.png)

Una vez que la validación es satisfactoria se ajusta el pipeline al conjunto de entrenamiento completo. En la tabla[ 8 ](#_page8_x273.77_y309.44)se observa una muestra de 20 de los coeficientesque arroja el modelo.

### 5.2. Hora de predecir

Una vez el modelo esté entrenado el siguiente paso es validarlo. Para esto se predice la probabilidad de que se dé un valor positivo en el conjunto de test, esto es, que el valor sea . El resultado se guarda en un dataframe distinto junto con la clase verdadera. En la tabla[ 9 ](#_page8_x281.65_y468.04)se puede observar un ejemplo en 10 observaciones.

![image](https://user-images.githubusercontent.com/45887686/204110242-5d49a9bd-eacc-4cfa-840f-c8fe595d5d16.png)

![image](https://user-images.githubusercontent.com/45887686/204110269-87e6953d-52dd-4899-985c-2e4307a71bf5.png)

Además, se dibujan las curva ROC y PR como se observa en las figuras[2 ](#_page9_x302.04_y222.97)y[ 3 ](#_page9_x305.99_y403.51)respectivamente.

Además se calcula el área bajo la curva ROC y se obtiene un valor de 0.7172 y el coeficienteGINI y se obtiene un valor de 0.4345.

### 5.3. Desarrollo de la scorecard

Para el desarrollo de la scorecard el primer paso es elegir los valores máximos y mínimos que podría tomar el puntaje. Para esto se eligen inicialmente los mismos que utiliza la FICO en Estados Unidos; es decir, el mínimo se toma en 350 y el máximo se toma en 850. Además se junta la tabla que se ilustra mediante la tabla [8 ](#_page8_x273.77_y309.44)con una tabla que contiene el nombre original de cada una de las variables ficticias.Posteriormente se escala cada uno de los coeficientesque retorna la regresión logística al rango que hemos seleccionado al igual que el intercepto, este es el valor inicial que puede tomar un usuario.

![image](https://user-images.githubusercontent.com/45887686/204110302-4a1b66d2-0f4f-45f5-9cc4-aca00eec0017.png)

![image](https://user-images.githubusercontent.com/45887686/204110318-5e79b59f-adb0-4d36-9a7c-a6452eb44a13.png)

### 5.4. Calcular los puntajes de conjunto de test

Finalmente para calcular el puntaje de cada observación en el conjunto de test es suficiente con realizar un producto punto entre el vector de observación y la columna de puntajes finales.

### 5.5. Selección del puntaje de corte

Para seleccionar el mejor puntaje de corte se utiliza el estadístico J de Youden.

El resultado que se obtiene es 0.360325, lo que significaque observaciones con una probabilidad predicha mayor a esta se clasificancomo por defecto y viceversa.

Además, en la figura[4 ](#_page11_x269.71_y366.97)se puede observar la ditribución de los puntajes del conjunto de test. Nótese que los puntajes están entre 500 y 1000, de lo cual se modifica el intervalo de puntajes posibles y se deja como valor mínimo 450 y como máximo 1000.

## 6. Conclusión

Todo este trabajo ha sido con el objetivo de obtener un modelo fácilmente utilizable por una entidad financieraque permite predecir la probabilidad de que una persona incumpla con sus obligaciones crediticias y se entrega en forma de scorecard. Ahora es posible para cualquier entidad utilizarlo para tomar decisiones sobre los créditos que se le otorgarán al cliente y es fácilmanete integrable con un app web de uso simple tal como se muestra en este ejemplo:

[https://main–heartfelt-cupcake-3270df.netlify.app/](https://main--heartfelt-cupcake-3270df.netlify.app/)

![image](https://user-images.githubusercontent.com/45887686/204110380-fcbbc62d-c2e7-4c6c-b691-079a2b718519.png)

## Referencias

1. Gareth James • Daniela Witten • Trevor Hastie Robert Tibshirani: An Introduction to Statistical Learning with Apllications in R ..
1. https://towardsdatascience.com/how-to-develop-a-credit-risk-model-and-scorecard-91335fc01f03
1. https://towardsdatascience.com/how-to-find-the-best-predictors-for-ml-algorithms-4b28a71a8a80
1. https://medium.com/swlh/how-to-quantify-risk-and-creditworthiness-c76725bc2380
1. https://towardsdatascience.com/how-to-avoid-potential-machine-learning-pitfalls-a08781f3518e
1. https://towardsdatascience.com/how-to-effectively-predict-imbalanced-classes-in-python-e8cd3b5720c4
1. https://datapeaker.com/big-data/asistente-virtual-de-ia-usando-python/
