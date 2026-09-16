<?php

namespace Tests\Feature;

use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TemplateCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_template_creation_persists_correct_dimensions_and_unit(): void
    {
        $user = User::factory()->create(['role' => 'editor']);

        $response = $this->actingAs($user)->post(route('templates.store'), [
            'name' => 'Test Template',
            'width' => 8.5,
            'height' => 11,
            'dpi' => 300,
            'unit' => 'in',
        ]);

        $response->assertRedirect(route('editor.show', Template::latest()->first()->id));

        $template = Template::where('name', 'Test Template')->first();

        $this->assertNotNull($template);
        $this->assertEquals(8.5, $template->width);
        $this->assertEquals(11, $template->height);
        $this->assertEquals('in', $template->unit);
        $this->assertEquals(300, $template->dpi);
        $this->assertEquals('private', $template->visibility);
    }

    public function test_template_creation_with_pixels_unit(): void
    {
        $user = User::factory()->create(['role' => 'editor']);

        $this->actingAs($user)->post(route('templates.store'), [
            'name' => 'Pixel Template',
            'width' => 1920,
            'height' => 1080,
            'dpi' => 96,
            'unit' => 'px',
        ]);

        $template = Template::where('name', 'Pixel Template')->first();

        $this->assertNotNull($template);
        $this->assertEquals(1920, $template->width);
        $this->assertEquals(1080, $template->height);
        $this->assertEquals('px', $template->unit);
    }
}
