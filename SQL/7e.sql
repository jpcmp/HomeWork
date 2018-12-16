select title
,count(rental_id) 'rented frequency'
from sakila.film
right join inventory on film.film_id = inventory.film_id
right join rental on inventory.inventory_id = rental.inventory_id

group by title

order by `rented frequency` desc