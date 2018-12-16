select count(inventory_id)

from sakila.inventory
join sakila.film on film.film_id = inventory.film_id

where title like '%Hunchback Impossible%'