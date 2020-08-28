2. Mostrar el título y el nombre del género de todas las series

```
SELECT
    series.title as titulo,
    genres.name as genero
FROM
    series
    INNER JOIN genres ON genre_id = genres.id
```

3. Mostrar el título de los episodios, el nombre y apellido de los actores que trabajan en
cada uno de ellos.

```
SELECT
    ep.title as episodio,
    CONCAT(ac.first_name, ' ', ac.last_name) as actores
FROM
    episodes ep
    INNER JOIN actor_episode ac_ep ON ac_ep.episode_id = ep.id
    INNER JOIN actors ac ON ac_ep.actor_id = ac.id
```

4. Mostrar sólo el nombre y apellido de los actores que trabajan en todas las películas de la guerra de las galaxias y que estos no se repitan.

```
SELECT DISTINCT
    CONCAT(ac.first_name, ' ', ac.last_name) as actores
FROM
    movies mo
    INNER JOIN actor_movie ac_mo ON ac_mo.movie_id = mo.id
    INNER JOIN actors ac ON ac_mo.actor_id = ac.id
WHERE
    mo.title LIKE '%La Guerra de las galaxias%'
```

5. Mostrar el título de cada película con su género correspondiente, en el caso de que no tenga género que imprima "no tiene género".

```
SELECT
    mo.title as titulo,
    COALESCE(ge.name, 'no tiene género') as genero
FROM
    movies mo
    LEFT JOIN genres ge ON mo.genre_id = mo.id
```

6. Mostrar el título de cada serie y en la segunda columna (a la cual llamaremos: duración) la cantidad de días desde su estreno hasta su fin.

```
SELECT
    series.title as titulo,
    DATEDIFF(end_date, release_date) as duracion
FROM
    series
```

7. Mostrar todos los actores cuyos nombre sean mayor a 6 caracteres, ordenados de la A a la Z.

```
SELECT
    first_name as nombre_largo
FROM
    actors
WHERE
    LENGTH(first_name) > 6
ORDER BY
    first_name
```

8. Mostrar la cantidad total de episodios.

```
SELECT
    COUNT(*)
FROM
    episodes
```

9. Mostrar el título de todas las series y el total de temporadas que tiene cada una de ellas.

```
SELECT
    ser.title as series,
    COUNT(*) as nro_temporadas
FROM
    series ser
    INNER JOIN seasons sea ON ser.id = sea.serie_id
GROUP BY
    ser.id
```

10. Mostrar el nombre de todos los géneros y la cantidad total de películas por cada uno siempre que sea mayor o igual a 3

```
SELECT
    ge.name as generos,
    COUNT(*) as nro_peliculas
FROM
    genres ge
    INNER JOIN movies mo ON mo.genre_id = ge.id
GROUP BY
    ge.id
HAVING
    nro_peliculas >= 3
```