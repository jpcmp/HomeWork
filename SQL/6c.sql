select title
,count(actor_id)

from sakila.film
inner join sakila.film_actor on film.film_id = film_actor.film_id

group by title