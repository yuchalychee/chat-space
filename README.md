## usersテーブル
|Column|Type|Options|
|------|----|———|
|email|string|null: false|
|name|string|null: false|
### Association 
- has_many :groups_users
- has_many :messages
has_many :groups, through: :groups_users

## groupテーブル
|Column|Type|Options|
|------|----|———|
|name|string|null: false|
### Association 
- has_many :groups_users
- has_many :messages
has_many :users, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|———|
|content|text||
|image|text||
|user|refarences|null: false, foreign_key: true|
|group|refarennces|null: false, foreign_key: true|
### Association 
- belongs_to :group
- belongs_to :user

## groups_usersテーブル 
|Column|Type|Options|
|------|----|-------|
|user|refarences|null: false, foreign_key: true|
|group|refarennces|null: false, foreign_key: true|
### Association 
- belongs_to :group 
- belongs_to :user 

