"""empty message

Revision ID: 5448d48596d8
Revises: 27bb66a216b7
Create Date: 2020-04-03 18:31:24.630897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5448d48596d8'
down_revision = '27bb66a216b7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('email', sa.String(), nullable=True))
    op.add_column('user', sa.Column('registered_on', sa.DateTime(), nullable=True))
    op.drop_constraint('user_username_key', 'user', type_='unique')
    op.create_unique_constraint(None, 'user', ['email'])
    op.drop_column('user', 'username')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'user', type_='unique')
    op.create_unique_constraint('user_username_key', 'user', ['username'])
    op.drop_column('user', 'registered_on')
    op.drop_column('user', 'email')
    # ### end Alembic commands ###