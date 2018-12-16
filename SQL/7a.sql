select title from sakila.film where (title like 'K%' or title like 'Q%') and language_id in (
select language_id from sakila.`language` where `name` = 'English')
