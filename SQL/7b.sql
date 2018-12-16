select first_name, last_name from sakila.actor where actor_id in (
select actor_id from sakila.film_actor where film_id in(
select film_id from sakila.film where title = 'Alone Trip'))