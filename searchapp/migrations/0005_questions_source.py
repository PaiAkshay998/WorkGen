# Generated by Django 2.1 on 2018-08-22 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('searchapp', '0004_questions_chapter_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='questions',
            name='source',
            field=models.TextField(blank=True, null=True),
        ),
    ]