# Generated by Django 4.2.7 on 2023-12-25 23:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_session_userid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticket',
            old_name='ticket_class',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='price',
        ),
    ]
